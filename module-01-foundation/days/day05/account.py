
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance

    @property
    def balance(self):
        return self._balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        print(f"Succesfully Deposited {amount} ETB. New Balance: {self._balance} ETB")
        
    def withdraw(self, amount):
        if amount<= 0:
            raise ValueError("Amount must be positive")
        elif amount > self.__balance:
            print("Insufficient balance!. you have only {self.__balance} ETB Available")
        
        self.__balance -= amount
        print(f"Withdrew {amount} ETB Successfully. Remaining Balance: {self._balance} ETB")
    
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

    def add_interest(self):
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

     def withdraw(self, amount: float) :
        
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
         
 # TODO: override withdraw() to allow the overdraft
 # TODO: override statement() to label the account type

base_acc = Account("Max well ", "ETB-1001", 1000)
sav_acc = SavingsAccount("Connor Assefa", "ETB-2001", 5000, rate=0.07)
curr_acc = CurrentAccount("Perez Gebrselassie", "ETB-3001", 500, overdraft=2000)

print("\n--- Specific Account Operations ---")
sav_acc.add_interest()
print()

curr_acc.withdraw(1500)

print("\n--- Polymorphic Statement Loop ---")
portfolio = [base_acc, sav_acc, curr_acc]

for acc in portfolio:
        acc.statement()

print("--- Overdraft Protection Check ---")
try:
    curr_acc.withdraw(2000) 
except ValueError as e:
        print(f"Caught expected error: {e}")