from turtle import Turtle
import turtle
import random

colors = ["red", "blue", "green", "purple", "orange", "pink", "brown", "cyan", "magenta", "yellow"]
t = Turtle()

i = 3
while i < 11:
    t.color(random.choice(colors))  # Random color for each shape
    angle = 360 / i
    j = 0
    while j < i:
        t.forward(100)
        t.right(angle)
        j += 1
    i += 1

turtle.done()