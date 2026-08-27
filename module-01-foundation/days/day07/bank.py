from abc import ABC, abstractmethod


class AccountRegistry:
    def __init__(self):
        self.by_number={}
        self.order=[]

    def add(self, acc):
        if acc.account_number in self.by_number:
            raise ValueError(f"Account {acc.account_number} already exists in registry.")
        
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        return [self.by_number[num] for num in self.order]

   
        

class BankConfig:
    _instance=None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000.0
        return cls._instance

class TransactionObserver(ABC):
    @abstractmethod
    def update(self, account_number, action , amount , current_balance):
        pass

class SMSAlert(TransactionObserver):
    def update(self, account_number, action, amount, current_balance):
        print(f"[SMS ALERT -> {account_number}]: {action.upper()} of {amount} ETB complete. "
              f"Current Balance: {current_balance} ETB")


class AuditLog(TransactionObserver):
    def update(self, account_number, action, amount, current_balance):
        print(f"[AUDIT LOG]: Acc: {account_number} | Action: {action} | Amount: {amount} ETB | "
              f"New Balance: {current_balance} ETB")

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


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers=[]
        self.history = TransactionStack()

    @property
    def balance(self):
        return self._balance
    
    def undo_last(self ):
            last_txn = self.history.pop()  
            action = last_txn["action"]
            amount = last_txn["amount"]

            if action == "Deposit":
                 self._balance -= amount
                 self._notify("Undo Deposit", amount)
            elif action == "Withdrawal":
                self._balance += amount
                self._notify("Undo Withdrawal", amount)
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self._notify("Deposit", amount)
        
    def withdraw(self, amount):
        if amount<= 0:
            raise ValueError("Amount must be positive")
        elif amount > self.__balance:
            print("Insufficient balance!. you have only {self.__balance} ETB Available")
        
        self.__balance -= amount
        self._notify("Deposit", amount)

    def subscribe(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def _notify(self, action ,amount):
        for observer in self._observers:
            observer.update(self.account_number ,action ,amount ,self._balance)

    def statement(self):
        print("         ADDIS BANK STATEMENT          ")
        print(f"Account Owner  : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Current Balance: {self._balance} ETB")
        print()

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self) -> None:
        interest = self.balance * self.rate
        print(f"[{self.owner}] Applying interest at rate {self.rate * 100}% (+{interest} ETB)")
        self.deposit(interest) 

    def statement(self):
        print("     ADDIS BANK STATEMENT - SAVINGS      ")
        print(f"Account Owner  : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Interest Rate  : {self.rate * 100}%")
        print(f"Current Balance: {self.balance} ETB")
        print()

class CurrentAccount(Account):
     def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

     def withdraw(self, amount: float) -> None:
        
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        
        if self._balance - amount < -self.overdraft:
            max_drawable = self._balance + self.overdraft
            raise ValueError(
                f"[{self.owner}] Overdraft limit exceeded! Requested: {amount} ETB. "
                f"Max available (including overdraft): {max_drawable} ETB"
            )

        self._balance -= amount
        print(f"[{self.owner}] Withdrew {amount} ETB. New Balance: {self._balance} ETB")

     def statement(self):
         print("     ADDIS BANK STATEMENT - CURRENT      ")
         print(f"Account Owner  : {self.owner}")
         print(f"Account Number : {self.account_number}")
         print(f"Overdraft Limit: {self.overdraft} ETB")
         print(f"Current Balance: {self.balance} ETB")
         print()
         
class AccountFactory:
    @staticmethod
    def create(kind ,owner , number, balance=0):
        kind=kind.strip().lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "standard":
            return Account(owner, number, balance)
        else:
            raise ValueError(f"Unknown account type: '{kind}'. Expected 'savings', 'current', or 'standard'.")

print("ADDIS BANK REGISTRY DEMO (DAY 7)")
registry = AccountRegistry()
sms = SMSAlert()


acc1=AccountFactory.create("savings","Perez Gusto","ETB-2001", 5000)
acc2=AccountFactory.create("current","Leandro Pez","ETB-3001", 500)


acc1.subscribe(sms)
acc1.subscribe(sms)

registry.add(acc1)
registry.add(acc2)

print("\n--- O(1) Lookup Check ---")
found = registry.find("ETB-1001")

if found is not None:
    print(f"Found Account: Owner={found.owner}, Balance={found.balance:.2f} ETB")
else:
    print("Account not found in registry!")



print("Listing Accounts in Insertion Order")
for acc in registry.list_all():
     print(f"-> Account {acc.account_number}: {acc.owner} ({type(acc).__name__})")
print()

print("Executing Transactions")
if found is not None:
    found.deposit(500.0)
    found.withdraw(200.0)
else:
    print("Error: Account 'ETB-1001' was not found in registry!") 

if found is not None:

    print(f"Current Balance before undo: {found.balance:.2f} ETB")

    print(" Undoing Last Transaction (LIFO) ")
    found.undo_last() 
    print(f"Balance after 1st undo: {found.balance:.2f} ETB")

    found.undo_last()  
    print(f"Balance after 2nd undo: {found.balance:.2f} ETB")
else: print("Error: Account 'ETB-1001' was not found in registry!") 
