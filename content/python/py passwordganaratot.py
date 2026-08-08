import random

# Lists of possible characters
letters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
symbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+']

print("Welcome to the PyPassword Generator!")

# Get user input
nr_letters = int(input("How many letters would you like in your password?\n"))
nr_symbols = int(input("How many symbols would you like?\n"))
nr_numbers = int(input("How many numbers would you like?\n"))

#Easy way

print('Easy to creack:\n\n\n')
password=''
for char in range(1, nr_letters + 1):
	password += random.choice(letters)
for symbol in range(1, nr_symbols + 1):
	password += random.choice(symbols)
for number in range(1, nr_numbers + 1):
	password += random.choice(numbers)
	
print(password)
 
# Hard way

print('Nearly impossiable to break:\n\n\n')

password=[]
for char in range(1, nr_letters + 1):
	password += random.choice(letters)
for symbol in range(1, nr_symbols + 1):
	password += random.choice(symbols)
for number in range(1, nr_numbers + 1):
	password += random.choice(numbers)
	
random.shuffle(password)
	
password_main=''
for pass_main in password:
	password_main += pass_main
print(password_main)