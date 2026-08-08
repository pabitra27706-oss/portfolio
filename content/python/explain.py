# GLOBAL SCOPE: Everything defined here is accessible anywhere in the code.
import random # Global scope - available everywhere

# All these variables are in GLOBAL SCOPE
print("Welcome to NUMBER GUESS game!")
print("I'm thinking of a number between 1 and 100")
thinking_no = random.randint(1, 100) # Global variable
attempts = 0 # Global variable

ask1 = input("Choose a difficulty. Type 'easy' or 'hard': ").lower()
if ask1 == "easy":
    attempts += 10 # Modifying global variable
    print(f"You have {attempts} attempts left to guess the number. ")
elif ask1 == "hard":
    attempts += 5 # Modifying global variable
    print(f"You have {attempts} attempts left to guess the number. ")

# FUNCTION DEFINITION in GLOBAL SCOPE
# This function has its own LOCAL SCOPE for parameters and variables inside it
def check_guess(u_input): # u_input is a LOCAL variable parameter
    # This function can ACCESS global variables like 'thinking_no'
    # but it can't MODIFY them without using the 'global' keyword
    if u_input == thinking_no: # Accessing GLOBAL 'thinking_no'
        print(f"You guessed right. The number is {thinking_no}")
        return True # Return value exits the function's local scope
    elif abs(thinking_no - u_input) <= 5: # Using GLOBAL 'thinking_no'
        if u_input < thinking_no:
            print("Very close! Just a little too low.")
        else:
            print("Very close! Just a little too high.")
    elif u_input < thinking_no:
        print("Too low.")
    else:
        print("Too high.")
    return False # Return value exits the function's local scope

# MAIN GAME LOOP - still in GLOBAL SCOPE
guess_correct = False # Global variable
while attempts > 0 and not guess_correct: # Checking global variables
    # This u_input is in GLOBAL SCOPE (different from the function parameter!)
    u_input = int(input("Make a guess: ")) # Global variable assignment
    
    # Calling the function: passing GLOBAL u_input's VALUE to function's LOCAL u_input parameter
    guess_correct = check_guess(u_input) # Function return value assigned to global variable
    
    attempts -= 1 # Modifying global variable
    if not guess_correct: # Checking global variable
        print(f"You have {attempts} attempts left.")

# FINAL MESSAGES - GLOBAL SCOPE
# These statements check the final state of global variables
if guess_correct:
    print("You win!")
else:
    print("You've run out of guesses. You lose.")