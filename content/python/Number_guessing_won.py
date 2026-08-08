import random

print("Welcome to NUMBER GUESS game!")
print("I'm thinking of a number between 1 and 100")
thinking_no = random.randint(1, 100) # Changed to 100 for 1-100 range
attempts = 0

ask1 = input("Choose a difficulty. Type 'easy' or 'hard': ").lower()
if ask1 == "easy":
    attempts += 10
    print(f"You have {attempts} attempts left to guess the number. ")
elif ask1 == "hard":
    attempts += 5
    print(f"You have {attempts} attempts left to guess the number. ")

# Let's define your distance function up here, outside the loop
def check_guess(u_input):
    if u_input == thinking_no:
        print(f"You guessed right. The number is {thinking_no}")
        return True # Signal that the guess was correct
    elif abs(thinking_no - u_input) <= 5: # Very close!
        if u_input < thinking_no:
            print("Very close! Just a little too low.")
        else:
            print("Very close! Just a little too high.")
    elif u_input < thinking_no:
        print("Too low.")
    else: # u_input > thinking_no
        print("Too high.")
    return False # Signal that the guess was wrong

# Main Game Loop
guess_correct = False
while attempts > 0 and not guess_correct:
    u_input = int(input("Make a guess: ")) # Get input inside the loop
    guess_correct = check_guess(u_input) # Call your function
    attempts -= 1 # Subtract an attempt after each guess
    if not guess_correct: # Only print attempts if guess was wrong
        print(f"You have {attempts} attempts left.")

# Final message after the loop ends
if guess_correct:
    print("You win!")
else:
    print("You've run out of guesses. You lose.")