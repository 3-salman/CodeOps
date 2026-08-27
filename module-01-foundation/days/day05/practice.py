from abc import ABC, abstractmethod

class Vehicle:
    def __init__(self , make , model ):
        self.make=make
        self.model=model
    def describe(self):
        print(f"Vehicle: {self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        pass

class Car(Vehicle):
    def __init__(self, make, model ):
        super().__init__(make, model)
    def wheels(self):
        return 4
    
class Truck(Vehicle):
    def __init__(self, make, model, capacity ):
        super().__init__(make, model)
        self.capacity=capacity
        
    def describe(self):
        print(f"Truck: {self.make} {self.model} capacity: {self.capacity}")

    def wheels(self):
        return 6
    
print("---Subclasses & Overriding ---")
car1= Car("Toyota", "Corolla")
truck1=Truck("Isuzu", "FSR", 8.5)

car1.describe()
truck1.describe()
print()

print("--- Polymorphism ---")
Several_Vehicles=[
    Car("BYD", "Atto"),
    Truck("Sinotruk", "Howo", 30.0)
]

for vehicles in Several_Vehicles:
    vehicles.describe()
print()

print("--- Abstract Wheels Method ---")
for vehicles in Several_Vehicles:
    print(f"{vehicles.make} {vehicles.model} has {vehicles.wheels()} wheels.")