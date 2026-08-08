from turtle import Turtle, Screen

timmi = Turtle()
print(timmi)  # Shows turtle object reference
timmi.shape("turtle")
timmi.color("coral")
timmi.forward(100)
my_screen = Screen()  # Corrected variable name
print(my_screen.canvwidth)  # Shows canvas width (default: 300)

# Keep the window open
my_screen.exitonclick()

