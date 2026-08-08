print('Wellcome to love calculator!!!')
name1=input('What is your name? \n')
name2=input('What is your lover name? \n')
name=name1.lower()
l_name2=name2.lower()
name=name1+l_name2
T=name.count('t')
R=name.count('r')
U=name.count('u')
E=name.count('e')
L=name.count('l')
O=name.count('o')
V=name.count('v')
E=name.count('e')
true= T+R+U+E
love=L+O+V+E
t_l1=(str(true)+str(love))
t_l=int(t_l1)
if t_l<10 or t_l>90:
	print(f'Your score is {t_l},You go togather like cock and mentos.')
elif t_l>40 and t_l<50:
	print(f'Your score is {t_l},you are alright togather.')
else:
	print(f'Your score is {t_l}')