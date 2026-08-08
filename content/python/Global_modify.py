# Global variable declared outside the function
enemies = 1

# Function that tries to increase the number of enemies
def increase_enemies():
    # This line accesses the global variable 'enemies' (since there's no local 'enemies' defined)
    print(f"enemies inside function: {enemies}")
    
    # Returns the incremented value of the global 'enemies'
    return enemies + 1

# The returned value (2) is reassigned to the global variable 'enemies'
enemies = increase_enemies()

# Now 'enemies' holds the new value (2)
print(f"enemies outside function: {enemies}")