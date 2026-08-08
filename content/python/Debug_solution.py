# Describe Problem
def my_function():
  for i in range(1, 21):# Change 20 to 31
    if i == 20:
      print("You got it")
my_function()

# Reproduce the Bug
from random import randint
dice_imgs = ["", "o", "oo", "ooo", "oooo", "ooooo", "oooooo"]
dice_num = randint(0, 5)#change 6 to 5 and 1 to 0 because list start from 0
print(dice_imgs[dice_num])

# Play Computer
year = int(input("What's your year of birth?"))
if year > 1980 and year < 1994:
  print("You are a millennial.")
elif year >= 1994:#only made > to >= to take also 1994 in logic.
  print("You are a Gen Z.")

# Fix the Errors
age = int(input("How old are you")) #add int function to say it's a integer 
if age > 18:
  print(f"You can drive at age {age}.") #add a indentation 
  
  #Print is Your Friend
pages = 0
word_per_page = 0
pages = int(input("Number of pages: "))
word_per_page = int(input("Number of words per page: "))
# Only one = need there was ==
total_words = pages * word_per_page
print(total_words)

#Use a Debugger
def mutate(a_list):
  b_list = []
  for item in a_list:
    new_item = item * 2
    b_list.append(new_item)
  print(b_list)

mutate([1,2,3,5,8,13])

