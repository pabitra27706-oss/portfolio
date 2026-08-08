from turtle import Turtle 
import random
import turtle  # Added for turtle.done()

colors = ["red", "blue", "green", "purple", "orange", "pink", "brown", "cyan", "magenta", "yellow"]
t = Turtle()
direction =[0,90,180,270]
t.speed('fastest')

i = 0
while i < 200:
    t.pensize(15)
    t.color(random.choice(colors))
    t.setheading(random.choice(direction))
    t.forward (50)
    
#    no = random.choice([0, 1, 2, 3])
#    if no == 0:
#        t.forward(50)
#    elif no == 1:  
#        t.backward(50)
#    elif no == 2:
#        t.right(90) 
#        t.backward(50) 
#    elif no == 3:
#        t.left(90) 
#        t.backward(50)  
#    elif no == 2:
#        t.right(90)  
#        t.forward(50)
#    elif no == 3:
#        t.left(90) 
#        t.forward(50)
    i+=1
turtle.done()