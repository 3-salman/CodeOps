from abc import ABC, abstractmethod


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


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers=[]

    @property
    def balance(self):
        return self._balance
    
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


cfg1= BankConfig()
cfg2= BankConfig()
print(f"[Singleton Check] Are cfg1 and cfg2 identical? {cfg1 is cfg2}")


sms_service=SMSAlert()
audit_service =AuditLog()


print("Creating Accounts via AccountFactory ")
acc1=AccountFactory.create("savings","Perez Gusto","ETB-2001", 5000)
acc2=AccountFactory.create("current","Leandro Pez","ETB-3001", 500)

acc1.subscribe(sms_service)
acc1.subscribe(audit_service)

acc2.subscribe(sms_service)
acc2.subscribe(audit_service)

print("\n---Performing Transactions (Observer Alerts Should Fire) ---")
acc1.deposit(1000)


if isinstance(acc1, SavingsAccount):
        acc1.add_interest()

print()
acc2.withdraw(1200)

print("\n--- Generating Statements ---")
for acc in [acc1, acc2]:
        acc.statement()



