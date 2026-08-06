"""=============================================================
File    : functions.py
Topic   : Functions in Python
Author  : Pabitra Chakrabortty
Created : 2026-03-05
Purpose : Definitions, defaults, multiple returns, *args and
          **kwargs, lambdas, map/filter, first-class functions
          and scope.
Run     : python functions.py
============================================================="""


# 1. Basic function with a docstring --------------------------------
def greet(name):
    """Return a greeting message for the given name."""
    return f"Hello, {name}! Welcome to Python functions."


print(greet("Pabitra"))


# 2. Default parameters ----------------------------------------------
def power(base, exponent=2):
    return base ** exponent


print("\n5^2 =", power(5))
print("2^8 =", power(2, 8))


# 3. Multiple return values (tuple unpacking) -------------------------
def divide(a, b):
    quotient = a // b
    remainder = a % b
    return quotient, remainder


q, r = divide(17, 5)
print("\n17 / 5 -> quotient:", q, "remainder:", r)


# 4. *args and **kwargs -------------------------------------------------
def summary(*args, **kwargs):
    print("\nPositional args:", args)
    print("Keyword args   :", kwargs)


summary(1, 2, 3, subject="Python", semester=3)


# 5. Lambda (anonymous) functions -----------------------------------------
square = lambda x: x * x
print("\nsquare(7) =", square(7))


# 6. map / filter with lambdas ----------------------------------------------
marks = [78, 92, 65, 88, 95, 71]
graced = list(map(lambda m: m + 5, marks))
passed = list(filter(lambda m: m >= 70, marks))
print("graced:", graced)
print("passed:", passed)


# 7. Functions are first-class objects ----------------------------------------
def apply(func, value):
    """Functions can be passed around like any other value."""
    return func(value)


print("\napply(square, 6) =", apply(square, 6))


# 8. Scope demo ------------------------------------------------------------------
college = "My Polytechnic"   # global


def show_scope():
    college_local = "inside value"   # local to this function
    print("local :", college_local)
    print("global:", college)


show_scope()
