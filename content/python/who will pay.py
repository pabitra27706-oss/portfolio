#Split string merthod
name_string=input("Give me everybody's name with a comma(,):\n")
names=name_string.split(",")
import random
doner=random.choice(names)
print('Today payment will given by '+(doner))