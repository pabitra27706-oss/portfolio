for number in range(1, 101):
  if number % 3 == 0 and number % 5 == 0:
    print("FizzBuzz")
    """Only sawing fizz buzz when the number devide by both 3 and 5 so there will be a 'and' statement not 'or'. """
  elif number % 3 == 0:
    """If we use "if' statement it will trigger after the 1st 'if' statement at any condition so we have to use 'elif' statement. """
    print("Fizz")
  elif number % 5 == 0:
    """If we use "if' statement it will trigger after the 1st 'if' statement at any condition so we have to use 'elif' statement. """
    print("Buzz")
  else:
    print(number)
