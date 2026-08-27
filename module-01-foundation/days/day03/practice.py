


print("--- Unique Cities ---")
city=["Addis Ababa","Adama","Adama","Adama","Hawassa","Harar","Harar"]
distinct_cities=set(city)
print(f"Distinct cities: {distinct_cities}")
print(f"Count: {len(distinct_cities)}\n")



print("--- Price Report ---")
grocery_items={
    "Injera":35.0,
    "Coffee Beans": 650.0,
    "Bananas":90.0,
    "Orange":100.0,
    "Apple":150.0
}

for item , price in grocery_items.items():
    print(f"{item}:{price}")
print()


print("--- Tax Comprehension ---")
prices = [100, 250, 400, 80]
with_tax=[p * 1.15 for p in prices]
print(f"Original: {prices}")
print(f"Taxed (15%): {with_tax}")
print()


print("--- Cheap Items ---")

cheap_items=[p for p in prices if p < 200]
print(f"Prices under 200: {cheap_items}")
print()



print("--- Write & Read ---")

with open("names.txt", "w") as f:
    f.write("Kane\nGordon\nMax\n") 
with open("names.txt", "r") as f:
    for line in f:
        print(line.strip())
print()


print("--- Safe Division ---")

user_input=input("enter number:")
try:
    number=float(user_input)
    result= 1000 / number
except ValueError:
    print("please eneter number")
except ZeroDivisionError:
    print("number cann't be zero")
else:
    print(f"result 1000/{user_input}={result}")


 

