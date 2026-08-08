student_scores=input('Input a list of student scores:').split()
for n in range(len(student_scores)):
    student_scores[n] = int(student_scores[n])
print(student_scores)

high_score=0
for score in student_scores:
	if high_score<score:
		high_score=score
print(high_score)
		
	