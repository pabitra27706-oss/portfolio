hight = float(input('Enter height in meter: '))
weight = float(input('Enter weight in kg: '))

bmi = weight / (hight ** 2)
r_bmi = round(bmi, 2)

if r_bmi < 18.5:
    print(f'Your BMI is {r_bmi}, you are underweight.')
elif 18.5 <= r_bmi < 25:
    print(f'Your BMI is {r_bmi}, you are normal weight.')
elif 25 <= r_bmi < 30:
    print(f'Your BMI is {r_bmi}, you are overweight.')
elif 30 <= r_bmi < 35:
    print(f'Your BMI is {r_bmi}, you are obese.')
else:
    print(f'Your BMI is {r_bmi}, you are clinically obese.')