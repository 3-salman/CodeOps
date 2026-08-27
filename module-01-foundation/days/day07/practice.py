import time
from collections import deque


# Snippet A: List Indexing
# my_list[5]
# Big-O: O(1) - Constant Time
# Why: Lists in Python are dynamic arrays with contiguous memory locations.
# Accessing an element by index calculates the memory offset directly without searching.

# Snippet B: Single Loop
# for item in my_list: print(item)
# Big-O: O(n) - Linear Time
# Why: The loop executes once for every element in the list. Execution time grows proportionally with n.

# Snippet C: Nested Loop
# for i in range(n):
#     for j in range(n):
#         print(i, j)
# Big-O: O(n^2) - Quadratic Time
# Why: For every iteration of the outer loop, the inner loop executes n times (n * n operations).

# Snippet D: Dictionary Lookup
# my_dict["ETB-1001"]
# Big-O: O(1) - Average Constant Time
# Why: Dictionaries use hash tables. Key lookup computes a hash value directly mapping to the value location.

# Snippet E: Binary Search
# while low <= high: mid = (low + high) // 2 ...
# Big-O: O(log n) - Logarithmic Time
# Why: Each comparison divides the remaining sorted search interval in half.
print("Big-O explanations written in comments above.")
print()

size=100000
accounts_list=[f"ETB-{i:06d}" for i in range(size)]
acoounts_dict={f"ETB-{i:06d}": True for i in range(size)}

target = "ETB-099999"
# Timing List Lookup (Linear Search: O(n))
start_time = time.perf_counter()
found_in_list = target in accounts_list
list_duration = time.perf_counter() - start_time

# Timing Dict Lookup (Hash Search: O(1))
start_time = time.perf_counter()
found_in_dict = target in acoounts_dict
dict_duration = time.perf_counter() - start_time

print(f"Target found: {found_in_list}")
print(f"List Lookup O(n) Time: {list_duration:.6f} seconds")
print(f"Dict Lookup O(1) Time: {dict_duration:.6f} seconds")
if dict_duration > 0:
    print(f"Dict lookup was ~{int(list_duration / dict_duration):,}x faster!")
print()

class Stack:
    def __init__(self):
        self._items=[]

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if len(self._items) == 0:
            print("the stack is empty")
        return self._items.pop()

    def peek(self):
        if len(self._items) == 0:
            print("the stack is empty")
        return self._items[-1]

    def size(self):
        return len(self._items)

names = ["Perez", "Connor", "Lewis", "David", "Abubeker"]
print(f"Original names: {names}")

stack = Stack()
for name in names:
    stack.push(name)

reversed_names=[]
while stack.size() != 0:
    reversed_names.append(stack.pop())

print(f"Reversed names: {reversed_names}")
print()


bank_queue=deque()

customers = ["Robel", "Ali", "Muaz", "Kia", "Noah"]
for customer in customers:
    bank_queue.append(customer)
    print(f"Enqueued customer: {customer}")

print("\n--- Serving Customers ---")
while bank_queue:
    served_customer = bank_queue.popleft()  
    print(f"Serving customer: {served_customer}")
print()


class Node:
    def __init__(self, data):
        self.data=data
        self.next=None

class LinkedList:
    def __init__(self):
        self.head=None

    def push_front(self, data):
        new_node =Node(data)
        new_node.data=data
        new_node.next=self.head
        self.head= new_node

    def print_all(self):
        current = self.head
        while current is not None:
            print(f"->{current.data}", end=""  )
            current = current.next



llist=LinkedList()
llist.push_front("Account C")
llist.push_front("Account B")
llist.push_front("Account A")

print("Linked List elements from head to tail:")
llist.print_all()

        
