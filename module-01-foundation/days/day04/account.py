
class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        print(f"Succesfully Deposited {amount} ETB. New Balance: {self.__balance} ETB")
        
    def withdraw(self, amount):
        if amount<= 0:
            raise ValueError("Amount must be positive")
        elif amount > self.__balance:
            print("Insufficient balance!. you have only {self.__balance} ETB Available")
        
        self.__balance -= amount
        print(f"Withdrew {amount} ETB Successfully. Remaining Balance: {self.__balance} ETB")
    
    def statement(self):
        print("         ADDIS BANK STATEMENT          ")
        print(f"Account Owner  : {self.owner}")
        print(f"Account Number : {self.account_number}")
        print(f"Current Balance: {self.__balance} ETB")
        print()


print("Create two separate accounts")
acc1 = Account("Tom Halland", "ETB-1001", 1000)
acc2 = Account("Max Lemmar", "ETB-1002", 500)
print("Tom Halland, ETB-1001, 1000")
print("Max Lemmar, ETB-1002, 500")
print()


print("Read balance by property (no direct setters)")
print(f"{acc1.owner}'s balance: {acc1.balance} ETB")
print()

print("Testing deposits and withdrawals")
acc1.deposit(500)
acc1.withdraw(200)
print()

print("Test Statement")
acc1.statement()

print("Prove independence between accounts") 
print(f"{acc2.owner}'s untouched balance(unaffected): {acc2.balance} ETB")