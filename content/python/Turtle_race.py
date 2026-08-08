from turtle import Turtle, Screen
import random

is_race_on=False
screen = Screen()
screen.setup(360, 640)
user_input=screen.textinput(title='Make your bet: ' , prompt='Chose your color of turtle:')
if  user_input:
	is_race_on=True

colors = ["violet", "blue", "red", "green", "yellow", "orange", "black"]
x = -160
y = 250

all_turtle=[]

for color in colors:
    t = Turtle()
    t.shape("turtle")
    t.shapesize(stretch_wid=2, stretch_len=3, outline=1)
    t.color(color)
    t.penup()
    t.goto(x, y)
    y -= 70
    all_turtle.append(t)
    
    	
while is_race_on:
	for turtle in all_turtle:
	   random_distance = random.randint(1,10)	
	   turtle.fd(random_distance)
	   if turtle.xcor()>250:
	   	is_race_on=False
	   	winer=turtle.pencolor()
	   	if winer== user_input:
	   		print('You win!!!')
	   	elif winer != user_input:
	   		print('Your turtle lost or Color invalid!!!')
	   	

screen.exitonclick()