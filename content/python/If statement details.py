hight=int(input("What is your hight in cm: "))
age=int(input("What is your age: "))
bill=0
if hight>120:
	print("You can ride ROLLARCOASTER.")
	if age<12:
		print("Child ticket,you have to pay $5.")
		bill=5
	elif age<=18:
		print("abc ticket,you have to pay $7.")
		bill=7
	else:
		print("Adult ticket,you have to pay $10.")
		bill=10
	print("y=yes & n=no")
	want_photo=input("Do you want photos? y or n: ")
	if want_photo=="y":
		bill +=3
	print(f"Your total bill is ${bill}.")
else:
	print("You can't ride ROLLARCOSTER.")