year=int(input('Which year do you want to check: '))
a=year
if a%4==0 and a%100!=0 or a%400==0:
	print('This is a leap year.')
else:
	print('This is not a leap year.')