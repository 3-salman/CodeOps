


class Book:
    def __init__(self , title, author, pages):
        self.title=title
        self.author=author
        self.pages=pages

    def describe(self ):

        print(f"===Book summery===")
        print(f"title:{self.title}")
        print(f"written by:{self.author}")
        print(f"total pages:{self.pages}")


Book1=Book("the lord of the ring","john doe",300)
Book2=Book("who cares","roben gordon", 240)

Book1.describe()
print()
Book2.describe()
print()


class product:

    def __init__(self,name, price , quantity):
        self.name=name
        self.price=price
        self.__quantity=quantity

    @property
    def quantity(self):
        return self.__quantity
    @quantity.setter
    def quantity(self, quantity):
        if quantity < 0:
            print(f"Stock for {self.name} cannot be negative")
        else: 
            self.__quantity=quantity

    def restock(self,n):
        self.quantity +=n
        print(f"new arrival  :{n}")
        print(f"total stock of {self.name} :{self.quantity}")

    def sell(self,n):
         if n < 0:
             print("sell quantity must be greater than zero.")
         elif n > self.quantity:
             print(f"Cannot sell {n} .there is only {self.quantity} in stock")
         else:     
             self.quantity -= n
             print(f"sold:{n} of {self.name}. Remaining Stock:{self.quantity}")



Book=product("Books", 200.0,1000)
Book.restock(1000)
Book.sell(30)
Book.quantity=-5
print()




p1= product("Coffee",80.0 , 50)
p2=product("Books" , 35.0, 100)
p3=product("Chair", 400.0, 20)

print("Before modification:")
print(f"{p1.name}: {p1.quantity} | {p2.name}: {p2.quantity} | {p3.name}: {p3.quantity}")
print()

print("selling 30 Books")
p2.sell(30)


print("\nAfter selling 30 from Books (p2):")
print(f"p1 ({p1.name}): {p1.quantity} :Unaffected")
print(f"p2 ({p2.name}): {p2.quantity} :Modified")
print(f"p3 ({p3.name}): {p3.quantity} :Unaffected")



