print('Wellcome to trasure island game!!!')
print('Your mission is to find the trasure.')
chose1=input('You are at a lake. where do you want to go? Type "left" or "right" ').lower()
if chose1=='left':
		print('You come to a lake. There is a island in the middle of the lake. Type "wait" to wait. Type "swime" to swime across.')
		chose2=input('You\'ve come to a lake. There is an island in the middle of the lake. Type "wait" to wait for a boat. Type "swim" to swim across.').lower()
		if chose2=='wait':
			chose3=input("You arrive at the island unharmed. There is a house with 3 doors. One red, one yellow and one blue. Which colour do you choose?").lower()
			if chose3=='red':
				print('The house is full of fire.Game over...')
			elif chose3=='blue':
				print('The house have a monster.Game over...')
			elif chose3=='yellow':
				print("Congratulations!!!! You won the game...")
			else:
				print('Your choise is not mention.Game over...')
		elif chose2=='swim':
			print('There is a crocodile.You fail.Game over.....')
				
		else:
			print('Your choise is not mention.Game over...')
else:
	print(' You fall into a hole.Game over......')
