# No block scope in Python

if True:
    a = 5  # Defined inside an if-block
    print("Inside if-block: a =", a)

# Still accessible outside the block
print("Outside if-block: a =", a)

for i in range(1):
    b = 10  # Defined inside a for-loop
    print("Inside for-loop: b =", b)

    if b == 10:
        c = 15  # Defined inside nested if-block
        print("Inside nested if-block: c =", c)

# Still accessible outside both blocks
print("Outside for-loop: b =", b)
print("Outside nested if-block: c =", c)