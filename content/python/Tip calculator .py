print('Welcome to tip calculator👍')
bill_1=input('What was the total bill:')
bill=float(bill_1)
tip_1=input('what percentage tip will you give:')
tip_2=float(tip_1)
tip=tip_2/100
on_people_1=input('How many people to split the bill:')
no_people=int(on_people_1)
pay_1=(1+tip)*bill
pay_2=pay_1/no_people
print('Each person should pay: ',round(pay_2,2))