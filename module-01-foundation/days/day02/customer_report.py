

customer=[
    ("Almaz",1500),("Dawit",700),("Tigist",200),
    ("Hanna",1200),("Samuel",450),
]

Premium_tier=0
Standard_tier=0
Basic_tier=0

def tier(balance):
    if balance >= 1000:
        global Premium_tier
        Premium_tier +=1
        return "Premium"
    elif balance >= 500:
        global Standard_tier
        Standard_tier +=1
        return "Standard"
    global Basic_tier
    Basic_tier +=1
    return "Basic"

print("===Customer Report===")
for name , balance in customer:
    print(f"{name}: {tier(balance)} ({balance} ETB)")


print("\n=====Tier Report=====")
print(f"Premium_tier:({Premium_tier}) Customer")
print(f"Standard_tier:({Standard_tier}) Customer")
print(f"Basic_tier:({Basic_tier}) Customer")



