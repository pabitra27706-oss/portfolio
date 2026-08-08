# Describe Problem
def my_function():
  for i in range(1, 20):
    if i == 20:
      print("You got it")
      #Tha Problem is in the upper code when i = 20 it should print. But it's not working 😢...
my_function()

#return is working for (x-1) so it's count 1 to 19 so 20 never come. 

# Reproduce the Bug
from random import randint
dice_imgs = ["o", "oo", "ooo", "oooo", "ooooo", "oooooo"]
dice_num = randint(1, 6)
#list start counting from 0 so the list wll be like 0 to 5. So, 6 no image is invalid. 
print(dice_imgs[dice_num])

# Play Computer
year = int(input("What's your year of birth?"))
if year > 1980 and year < 1994:
  print("You are a millennial.")
elif year > 1994:
  #all years are greter than or less than 1994 so 1994 never meet any logic. 
  print("You are a Gen Z.")

# Fix the Errors
age = (input("How old are you?"))
# The input is working as a string not intiger so if statement failed. 
if age > 18:
print(f"You can drive at age {age}.")
# Here a indent problem after if statement. 

#Print is Your Friend
pages = 0
word_per_page = 0
pages = int(input("Number of pages: "))
word_per_page = int(input("Number of words per page: "))
print(f"pages={pages}")
print(f"word_per_page={word_per_page}")
#here always word_per_page became 0 become of == so it not taking user inputs but the the first define value. 
total_words = pages * word_per_page
print(total_words)

#Use a Debugger
def mutate(a_list):
  b_list = []
  for item in a_list:
    new_item = item * 2
  b_list.append(new_item)
  print(b_list)
#Useing a Debuggerlike thoney see what happens step by step
mutate([1,2,3,5,8,13])

