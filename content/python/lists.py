"""=============================================================
File    : lists.py
Topic   : Python Lists - deep dive
Author  : Pabitra Chakrabortty
Created : 2026-03-28
Purpose : Everything important about Python lists in one file:
          creating, indexing, slicing, methods, comprehensions
          and the aliasing pitfall.
Run     : python lists.py
============================================================="""

# 1. Creating lists -------------------------------------------------
fruits = ["apple", "banana", "mango"]
numbers = [10, 20, 30, 40, 50]
mixed = [1, "two", 3.0, True]
empty = []

print("fruits:", fruits)
print("mixed :", mixed)

# 2. Indexing (positive and negative) ------------------------------
print("\nFirst fruit :", fruits[0])
print("Last fruit  :", fruits[-1])   # negative index counts from the end

# 3. Slicing [start:stop:step] ---------------------------------------
print("numbers[1:4] :", numbers[1:4])    # 20,30,40 (stop is excluded)
print("numbers[:3]  :", numbers[:3])
print("numbers[::2] :", numbers[::2])    # every 2nd item
print("reversed     :", numbers[::-1])   # the classic reverse trick

# 4. Useful list methods ----------------------------------------------
fruits.append("guava")        # add at the end
fruits.insert(1, "orange")    # insert at an index
fruits.remove("banana")       # remove by value
popped = fruits.pop()         # remove + return the last item
print("\nAfter changes:", fruits, "| popped:", popped)

nums = [5, 3, 8, 1, 9]
nums.sort()                   # sorts in place
print("sorted:", nums, "| sorted desc:", sorted(nums, reverse=True))
print("count of 8:", nums.count(8), "| index of 3:", nums.index(3))

# 5. List comprehensions ------------------------------------------------
squares = [n * n for n in range(1, 6)]
evens = [n for n in range(1, 11) if n % 2 == 0]
print("\nsquares:", squares)
print("evens  :", evens)

# 6. Nested lists (a tiny 3x3 matrix) ------------------------------------
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
print("\nmatrix[1][2] =", matrix[1][2])   # row 1, column 2 -> 6

# flatten with a double comprehension
flat = [value for row in matrix for value in row]
print("flattened    =", flat)

# 7. Common pitfall: aliasing ----------------------------------------------
a = [1, 2, 3]
b = a            # b points to the SAME list, not a copy
b.append(4)
print("\nAfter b.append(4): a =", a)   # a changed too!
c = a.copy()     # proper copy -> independent list
c.append(99)
print("c =", c, "| a is still =", a)
