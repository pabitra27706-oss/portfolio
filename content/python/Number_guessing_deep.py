import random

print("Welcome to NUMBER GUESS game!")
print("I'm thinking of a number between 1 and 100")
thinking_no = random.randint(1, 100) # Use 100, not 101, to get 1-100
attempts = 0

ask1 = input("Choose a difficulty. Type 'easy' or 'hard': ").lower()
if ask1 == "easy":
    attempts = 10 # Use =, not +=, to set the value
    print(f"You have {attempts} attempts left to guess the number. ")
elif ask1 == "hard":
    attempts = 5 # Use =, not +=, to set the value
    print(f"You have {attempts} attempts left to guess the number. ")
else:
    print("Not a valid choice. Defaulting to easy.")
    attempts = 10

# This is the main game loop. It runs as long as the player has attempts left.
while attempts > 0:
    # Get the user's guess inside the loop, each time
    u_input = int(input("Make a guess: ")) # Convert input to an integer immediately

    # Check the guess against the secret number
    if u_input == thinking_no:
        print(f"You got it! The answer was {thinking_no}.")
        break # This breaks out of the while loop immediately
    elif u_input < thinking_no:
        print("Too low.")
    else: # This means u_input must be greater than thinking_no
        print("Too high.")

    # If they got it wrong, subtract one attempt
    attempts -= 1 # This is the same as attempts = attempts - 1
    print(f"You have {attempts} attempts remaining.")

# This code runs after the while loop finishes (either by break or running out of attempts)
if attempts == 0:
    print("You've run out of guesses. You lose.")