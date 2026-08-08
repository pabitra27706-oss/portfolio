print('Wellcome to avarage clculator!!!!!')
print('Input the numbers only with a space.')
print('EAMPLE: 1 2 3 .....')
student_heights = input("Input a list of student heights: ").split()
for n in range(len(student_heights)):
    student_heights[n] = int(student_heights[n])
print(student_heights)

total_height=0
for height in student_heights:
	total_height += height
	
student_no=0
for no in student_heights:
	student_no += 1

avg_height= int(total_height/student_no)
print(f'Students avarage height is {avg_height}')
