from abc import ABC, abstractmethod
from collections import deque


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


# ==========================================
# Day 9: Tree Structure - Branch Hierarchy
# ==========================================
class Branch:
    def __init__(self, name: str):
        self.name = name
        self.children = []  # Sub-branches
        self.accounts = []  # Accounts belonging directly to this branch

    def add_child(self, child_branch: "Branch") -> None:
        self.children.append(child_branch)

    def add_account(self, acc: Account) -> None:
        self.accounts.append(acc)

    def total_balance(self) -> float:
        """Recursively calculates total balance of this branch and all sub-branches."""
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total


# ==========================================
# Day 9: Graph Structure - Transfers Traversal
# ==========================================
def bfs(transfers: dict, start: str) -> list[str]:
    """
    Performs BFS traversal over the transfers graph starting from 'start'.
    Returns a list of all unique accounts reachable through transfer links.
    """
    if start not in transfers:
        return []

    visited = set([start])
    queue = deque([start])
    reachable = []

    while queue:
        current = queue.popleft()
        for recipient in transfers.get(current, []):
            if recipient not in visited:
                visited.add(recipient)
                reachable.append(recipient)
                queue.append(recipient)

    return reachable



print("=== ADDIS BANK MODELING DEMO (DAY 9) ===")

# Setup Accounts via Factory
acc1 = AccountFactory.create("savings", "Abebe Bikila", "ETB-1001", 5000.0)
acc2 = AccountFactory.create("current", "Tigist Assefa", "ETB-1002", 12000.0)
acc3 = AccountFactory.create("standard", "Bekele Tola", "ETB-1003", 3000.0)
acc4 = AccountFactory.create("savings", "Genet Zewde", "ETB-1004", 7500.0)
acc5 = AccountFactory.create("current", "Haile Gebrselassie", "ETB-1005", 20000.0)


head_office = Branch("Addis HQ")


central_region = Branch("Central Region")
southern_region = Branch("Southern Region")
head_office.add_child(central_region)
head_office.add_child(southern_region)


bole_branch = Branch("Bole Branch")
kazanchis_branch = Branch("Kazanchis Branch")
hawassa_branch = Branch("Hawassa Branch")

central_region.add_child(bole_branch)
central_region.add_child(kazanchis_branch)
southern_region.add_child(hawassa_branch)


head_office.add_account(acc5)        
bole_branch.add_account(acc1)        
bole_branch.add_account(acc2)        
kazanchis_branch.add_account(acc3)   
hawassa_branch.add_account(acc4)     

print("\n--- Recursive Tree Balance Verification ---")
print(f"Bole Branch Total     : {bole_branch.total_balance():,.2f} ETB")      # 17,000
print(f"Central Region Total  : {central_region.total_balance():,.2f} ETB")   # 20,000
print(f"Head Office Total (All): {head_office.total_balance():,.2f} ETB")     # 47,500


transfers_graph = {
    "ETB-1001": ["ETB-1002", "ETB-1003"],
    "ETB-1002": ["ETB-1004"],
    "ETB-1003": ["ETB-1004", "ETB-1005"],
    "ETB-1004": [],
    "ETB-1005": ["ETB-1001"]  
}

print("\n--- Graph BFS Transfer Traversal ---")
start_acc = "ETB-1001"
reachable_accounts = bfs(transfers_graph, start_acc)
print(f"Accounts reachable from {start_acc}: {reachable_accounts}")