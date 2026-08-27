#Exercise

# Temperature label. Ask for a temperature in °C, then print "cold" below 15, "warm" from 15–
# 28, and "hot" above 28, using if / elif / else.

print("Exercise 1: Temperature")
user_input=float(input("enter temperature in °C:"))
if user_input < 15:
    print("cold")
elif user_input <= 28:
    print("warm")
else: print("hot")
print()

# Receipt loop. Use a for loop and range to print receipt numbers 1 through 10, each on its own
# line as "Receipt #N".
print("Exercise 2: Receipt Loop")
for num in range(1,11):
    print(f"Receipt #{num}")
print()  

# Even numbers. Print every even number from 1 to 20 using a loop and the modulo operator %.
print("Exercise 3: Even Numbers from 1 to 20")
for num in range(1,21):   
    if num % 2 == 0:
        print(num, end=" ")
    
print("\n")

# Discount function. Write apply_discount(price, percent=10) that returns the price after the
# discount. Test it with and without the default.
print("Exercise 4: Discount Function ")
def apply_discount(price, percent=10):
    discount_amount = price * (percent / 100)
    return discount_amount

discount_amount=apply_discount(100)
print(f"Price:100 ETB. Default 10% Discount:{discount_amount} ETB")

discount_amount=apply_discount(100, 25)
print(f"Price:100 ETB. apply 25% Discount:{discount_amount} ETB")
print()


# Countdown. Use a while loop to count down from 5 to 1, printing each number, then print
# "Liftoff!"
print("Exercise 5: Countdown ")
countdown=5
while countdown > 0 :
    print(countdown)
    countdown -=1
print("Liftoff!")