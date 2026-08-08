from turtle import Turtle, Screen
import turtle

tim=Turtle()

def move_forward():
    tim.forward(10)
def move_backward():
    tim.backward(10)
def turn_right():
    new_heading = tim.heading() - 10
    tim.setheading(new_heading)
def turn_left():
     new_heading = tim.heading() + 10
     tim.setheading(new_heading)
def clear_screen():
    tim.clear()
    tim.penup()
    tim.home()
    tim.pendown()
screen=Screen ()
screen.listen()

screen.onkey(key='W', fun=move_forward)
screen.onkey(key='S', fun=move_backward)
screen.onkey(key='A', fun=turn_right)
screen.onkey(key='D', fun=turn_left)
screen.onkey(key='C', fun=clear_screen)

turtle.done()