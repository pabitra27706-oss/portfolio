rock = '''
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
'''

paper = '''
     _______
---'    ____)____
           ______)
          _______)
         _______)
---.__________)
'''

scissors = '''
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
'''
game_image=[rock,paper,scissors]
u_input=int(input('What is your choice?\n 0 for ROCK, 1 for PAPER, 2 for SCISSORS:' ))
if u_input<0 or u_input>2:
	print('You lose. Invalid move...')
else:
	print(game_image[u_input])
	import random
	c_input=random.randint(0,2)
	print('Computer choice:')
	print(game_image[c_input])
	
	if u_input==c_input:
		print("It's a draw.")
	elif u_input==0 and c_input==2:
		print("You win!!")
	elif u_input==1 and c_input==0:
		print("You win!!")
	elif u_input==2 and c_input==1:
		print("You win!!")
	else:
		print("You lose")