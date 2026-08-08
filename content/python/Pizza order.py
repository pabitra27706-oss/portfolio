print('Wellcome to python pizza delivaries!!')
size=input('What size pizza do you want? S, M & L: ')
add_peperoni=input('Do you want peperoni? Y or N: ')
extra_cheese=input('Do you want extra cheese? Y or N: ')
bill=0
if size=='S':
	bill +=15
	if add_peperoni=='Y':
		bill +=2
elif size=='M':
	bill +=20
	if add_peperoni=='Y':
		bill +=3
else:
	bill +=25
	if add_peperoni=='Y':
		bill +=3
if extra_cheese=='Y':
	bill +=1
print(f'Your final bill is ${bill}')
#other way
#[if size=='S':
#	bill +=15
#elif size=='M':
#	bill +=20
#else:
#	bill +=25


#if add_peperoni=='Y':
#	if size=='S':
#		bill +=2
#else:
#	bill +=3


#if extra_cheese=='Y':
#	bill +=1
#print(f'Your finall bill is ${bill}')
	

	