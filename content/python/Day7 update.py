import random

word_list = ["aardvark", "baboon", "camel"]
chosen_word = random.choice(word_list)

# Testing code
print(f"Pssst, the solution is {chosen_word}")

# TODO-1: – Use a while loop to let the user guess again. 
# The loop should only stop once the user has guessed all the letters in the chosen_word 
# and 'display' has no more blanks ("_"). Then you can tell the user they've won.

display = []
for _ in chosen_word:
    display += "_"

end_of_game = False

while not end_of_game:
    guess = input("Guess a letter: ").lower()

    # TODO-2: – Loop through each position in the chosen_word;
    # If the letter at that position matches 'guess' then reveal that letter in the display at that position.
    for position in range(len(chosen_word)):
        letter = chosen_word[position]
        if letter == guess:
            display[position] = letter

    # TODO-3: – Print 'display' and you should see the guessed letter in the correct position
    # and every other letter replaced with "_".
    print(display)
    if "_" not in display:
        end_of_game = True
        print("You win!")
