# Global variable: accessible throughout the program
x = 10  

def outer_function():
    # Local variable in outer_function
    y = 20  

    def inner_function():
        # Local variable in inner_function
        z = 30  
        
        # Accessing global variable
        print("Global x:", x)  
        
        # Accessing outer function's local variable
        print("Enclosed y:", y)  
        
        # Accessing inner function's local variable
        print("Local z:", z)  

        # Local namespace: variables defined inside inner_function
        print("Local namespace inside inner_function:", locals())

    inner_function()

# Calling the outer function
outer_function()

# Global namespace: variables defined at the top level
print("Global namespace:", globals())