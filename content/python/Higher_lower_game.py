#all questions
ask_disk =[
    "Instagram (The official platform account)",
    "Cristiano Ronaldo (Portuguese football superstar)",
    "Lionel Messi (Argentine football legend)",
    "Selena Gomez (Singer, actress, and Rare Beauty founder)",
    "Kylie Jenner (Reality TV star and Kylie Cosmetics founder)",
    "Dwayne 'The Rock' Johnson (Actor and former wrestler)",
    "Ariana Grande (Singer and actress)",
    "Kim Kardashian (Reality TV star and SKIMS founder)",
    "Beyoncé (Singer and cultural icon)",
    "Khloé Kardashian (Reality TV star and Good American founder)",
    "Nike (Global sportswear brand)",
    "Kendall Jenner (Model and reality TV star)",
    "Justin Bieber (Canadian pop singer)",
    "Taylor Swift (Singer-songwriter)",
    "Virat Kohli (Indian cricketer)",
    "National Geographic (Magazine and media brand)",
    "Nicki Minaj (Rapper and singer)",
    "Miley Cyrus (Singer and actress)",
    "Katy Perry (Singer and American Idol judge)",
    "Zendaya (Actress and fashion icon)",
    "Kevin Hart (Comedian and actor)",
    "Drake (Canadian rapper and singer)",
    "Chris Brown (Singer and dancer)",
    "Real Madrid C.F. (Spanish football club)",
    "Ellen DeGeneres (Television host and comedian)",
    "UEFA Champions League (European football tournament)",
    "NBA (National Basketball Association)",
    "Rihanna (Singer and Fenty Beauty founder)",
    "FC Barcelona (Spanish football club)",
    "NASA (National Aeronautics and Space Administration)",
    "Gal Gadot (Actress and former Miss Israel)",
    "Vin Diesel (Actor known for Fast & Furious)",
    "Demi Lovato (Singer and actress)",
    "Billie Eilish (Singer-songwriter)",
    "Kylian Mbappé (French football star)",
    "Emma Watson (Actress and activist)",
    "Shakira (Colombian singer and performer)",
    "David Beckham (Former English footballer)",
    "Mark Zuckerberg (Meta/Facebook co-founder)",
    "Will Smith (Actor and rapper)"
]

#######################################
#all answers 
ans_disk =[694.0, 663.0, 506.0, 417.0, 392.0, 392.0, 374.0, 355.0, 310.0, 301.0, 299.0, 294.0, 286.0, 282.0, 277.0, 273.0, 248.0, 231.0, 224.0, 217.0, 212.0, 203.0, 177.4, 177.0, 176.0, 163.0, 158.0, 153.0, 149.0, 144.0, 142.0, 142.3, 135.0, 125.6, 125.0, 121.0, 107.5, 107.0, 103.0, 96.3]

logo="""
 _  _  ____  __     ___  __   _  _  ____ 
/ )( \(  __)(  )   / __)/  \ ( \/ )(  __)
\ /\ / ) _) / (_/\( (__(  O )/ \/ \ ) _) 
(_/\_)(____)\____/ \___)\__/ \_)(_/(____)
"""
vs="""
 _  _  ____ 
/ )( \/ ___)
\ \/ /\___ \\
 \__/ (____/
 """
##### Game code 
import random 
import os

print (logo)
score=0 
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

continue_game=True 
random_no1 = random.randint(0,39)
while continue_game:
  random_no2 = random.randint(0,39)
  while random_no1==random_no2:
    random_no2 = random.randint(0,39)
  clear_screen()
  print (logo)
  print (f"Your current score is {score}")
  def game_ui():
    choice_a=ask_disk[random_no1]
    print(f"Compare A: {choice_a}")
    
    print (vs)
    choice_b=ask_disk[random_no2]
    print (f"Against B: {choice_b}")
  game_ui()  
  u_input =input("Who has more followers. Type 'A' or 'B': ").lower()
  a=ans_disk[random_no1]
  b=ans_disk[random_no2]
  if u_input=="a":
    if a > b:
      print ("You guessed correct. ")
      score += 1
      # Don't change random_no1 - keep the correct answer as option A
    else:
      print ("You guessed wrong. Game over....")
      continue_game= False 
  elif u_input=="b":
    if b > a:
      print ("You guessed correct. ")
      score += 1
      # Make option B the new option A for next round
      random_no1 = random_no2
    else:
      print ("You guessed wrong. Game over....")
      continue_game= False 
  else:
    print ("Invalid input. Please type 'A' or 'B'.")