from question_model import Question
from data import question_data
from quiz_brain import QuizBrain

question_bank = []
for question in question_data:
  question_text = question["text"]
  question_answer = question["answer"]
  new_q=Question(question_text, question_answer)
  question_bank.append(new_q)

quiz=QuizBrain(question_bank)
# FIX: Added '()' to call the method, correctly ending the quiz when no questions remain.
while quiz.still_has_question():
  quiz.next_question()


print ("You have completed the quiz!!")
print(f"Your final score was {quiz.score}/{quiz.question_number}")
