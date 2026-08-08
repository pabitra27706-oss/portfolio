from turtle import Turtle 
import random
import turtle

turtle.colormode(255)
tim = Turtle()

def random_color():
    r = random.randint(0, 255)
    g = random.randint(0, 255)
    b = random.randint(0, 255)
    random_color = (r, g, b)
    return random_color

i=0
while i<37:
    tim.speed ('fastest')
    tim.pensize(5)
    tim.color(random_color())
    current_heading =tim.heading()
    tim.setheading(current_heading+10)
    tim.circle(100)
    i += 1

turtle.done()