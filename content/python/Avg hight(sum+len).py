student_heights = input("Input a list of student heights: ").split()
for n in range(len(student_heights)):
    student_heights[n] = int(student_heights[n])
print(student_heights)
sum_of_hight=sum(student_heights)
total_students_number=len(student_heights)
avg_student_hight=sum_of_hight/total_students_number
avg_student_hight_int=int(avg_student_hight	)
print(avg_student_hight_int)