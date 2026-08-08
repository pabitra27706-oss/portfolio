year = int(input("Which year do you want to check?"))
"""The inputwas taking strings so any mathscan't be done.
So, we have to convertit in integer. """
if year % 4 == 0:
  if year % 100 == 0:
    if year % 400 == 0:
      print("Leap year.")
    else:
      print("Not leap year.")
  else:
    print("Leap year.")
else:
  print("Not leap year.")
