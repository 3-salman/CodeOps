from abc import ABC, abstractmethod


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000.0
        return cls._instance


class TransactionObserver(ABC):
    @abstractmethod
    def update(self, account_number: str, action: str, amount: float, current_balance: float) -> None:
        pass


class SMSAlert(TransactionObserver):
    def update(self, account_number: str, action: str, amount: float, current_balance: float) -> None:
        print(f"[SMS ALERT -> {account_number}]: {action.upper()} of {amount:.2f} ETB complete. "
              f"Current Balance: {current_balance:.2f} ETB")


class AuditLog(TransactionObserver):
    def update(self, account_number: str, action: str, amount: float, current_balance: float) -> None:
        print(f"[AUDIT LOG]: Acc: {account_number} | Action: {action} | Amount: {amount:.2f} ETB | "
              f"New Balance: {current_balance:.2f} ETB")


class TransactionStack:
    def __init__(self):
        self._items = []

    def push(self, action: str, amount: float):
        self._items.append({"action": action, "amount": amount})

    def pop(self):
        if self.is_empty():
            raise IndexError("No transactions to undo.")
        return self._items.pop()

    def peek(self):
        return self._items[-1] if not self.is_empty() else None

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def to_list(self) -> list:
        return list(self._items)

class Account:
    def __init__(self, owner: str, account_number: str, balance: float = 0):
        self.owner = owner
        self.account_number = account_number
        if balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        self._balance = balance
        self._observers = []
        self.history = TransactionStack()

    @property
    def balance(self) -> float:
        return self._balance

    def subscribe(self, observer: TransactionObserver) -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def _notify(self, action: str, amount: float) -> None:
        for observer in self._observers:
            observer.update(self.account_number, action, amount, self._balance)

    def deposit(self, amount: float, record_history: bool = True) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self._balance += amount
        if record_history:
            self.history.push("Deposit", amount)
        self._notify("Deposit", amount)

    def withdraw(self, amount: float, record_history: bool = True) -> None:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self._balance:
            raise ValueError(f"[{self.owner}] Insufficient funds! Available: {self._balance:.2f} ETB")
        self._balance -= amount
        if record_history:
            self.history.push("Withdrawal", amount)
        self._notify("Withdrawal", amount)

    def undo_last(self) -> None:
        last_txn = self.history.pop()
        action = last_txn["action"]
        amount = last_txn["amount"]
        if action == "Deposit":
            self._balance -= amount
            self._notify("Undo Deposit", amount)
        elif action == "Withdrawal":
            self._balance += amount
            self._notify("Undo Withdrawal", amount)

    def statement(self) -> None:
        print("-" * 40)
        print("     ADDIS BANK STATEMENT - STANDARD     ")
        print("-" * 40)
        print(f"Account Owner  : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Current Balance: {self._balance:.2f} ETB")
        print("-" * 40)


class SavingsAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, rate: float = None):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.rate = rate if rate is not None else config.interest_rate

    def add_interest(self) -> None:
        interest = self.balance * self.rate
        self.deposit(interest)


class CurrentAccount(Account):
    def __init__(self, owner: str, account_number: str, balance: float = 0, overdraft: float = None):
        super().__init__(owner, account_number, balance)
        config = BankConfig()
        self.overdraft = overdraft if overdraft is not None else config.overdraft_limit

    def withdraw(self, amount: float, record_history: bool = True) -> None:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self._balance - amount < -self.overdraft:
            max_drawable = self._balance + self.overdraft
            raise ValueError(
                f"[{self.owner}] Overdraft limit exceeded! Requested: {amount:.2f} ETB. "
                f"Max available: {max_drawable:.2f} ETB"
            )
        self._balance -= amount
        if record_history:
            self.history.push("Withdrawal", amount)
        self._notify("Withdrawal", amount)


class AccountFactory:
    @staticmethod
    def create(kind: str, owner: str, number: str, balance: float = 0) -> Account:
        kind = kind.strip().lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "standard":
            return Account(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: '{kind}'.")


def binary_search(items: list, target: str) -> int:
    low = 0
    high = len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


def _recursive_sum_txns(txns: list) -> float:
    if not txns:
        return 0.0
    return txns[0]["amount"] + _recursive_sum_txns(txns[1:])


class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc: Account) -> None:
        if acc.account_number in self.by_number:
            raise ValueError(f"Account {acc.account_number} already exists in registry.")
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number: str) -> Account:
        return self.by_number.get(number)

    def list_all(self) -> list:
        return [self.by_number[num] for num in self.order]

    def top_by_balance(self, n: int = 5) -> list:
        accts = sorted(self.by_number.values(), key=lambda a: a.balance, reverse=True)
        return accts[:n]

    def find_by_number(self, number: str) -> Account:
        nums = sorted(self.by_number.keys())
        idx = binary_search(nums, number)
        return self.by_number[nums[idx]] if idx >= 0 else None

    def total_transactions(self, number: str) -> float:
        acc = self.find(number)
        if not acc:
            raise ValueError(f"Account {number} not found.")
        txns = acc.history.to_list()
        return _recursive_sum_txns(txns)


if __name__ == "__main__":
    registry = AccountRegistry()

    acc1 = AccountFactory.create("savings", "Abebe Bikila", "ETB-1001", 2000.0)
    acc2 = AccountFactory.create("current", "Tigist Assefa", "ETB-1003", 8500.0)
    acc3 = AccountFactory.create("standard", "Bekele Tola", "ETB-1002", 4100.0)
    acc4 = AccountFactory.create("savings", "Genet Zewde", "ETB-1004", 12000.0)

    for a in [acc1, acc2, acc3, acc4]:
        registry.add(a)

    print("--- Top 3 by Balance ---")
    top3 = registry.top_by_balance(3)
    for a in top3:
        print(f"{a.owner} ({a.account_number}): {a.balance:.2f} ETB")

    print("\n--- Binary Search Lookup ---")
    found = registry.find_by_number("ETB-1002")
    if found:
        print(f"Found via binary search: {found.owner} with {found.balance:.2f} ETB")

    not_found = registry.find_by_number("ETB-9999")
    print(f"Search for missing ETB-9999: {not_found}")

    print("\n--- Recursive Transaction Total ---")
    acc1.deposit(500.0)
    acc1.withdraw(200.0)
    acc1.deposit(1500.0)
    
    total_val = registry.total_transactions("ETB-1001")
    print(f"Total transaction volume for ETB-1001: {total_val:.2f} ETB")