def is_leap(year):
  """
  Checks if a year is a leap year.
  A year is a leap year if it is divisible by 4,
  unless it is divisible by 100 but not by 400.
  """
  if year % 4 == 0:
    if year % 100 == 0:
      if year % 400 == 0:
        return True
      else:
        return False
    else:
      return True
  else:
    return False

def days_in_month(year, month):
  """
  Given a year and a month, returns the number of days in that month.
  Accounts for leap years.
  """
  # List of days for each month (January to December)
  month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
  # Check if the input month is valid (between 1 and 12)
  if not 1 <= month <= 12:
      return "Invalid month entered."

  # Check if it's a leap year and the month is February
  # If so, return 29
  if is_leap(year) and month == 2:
    return 29
  
  # For all other cases, return the number of days from our list.
  # We subtract 1 from the month because lists are zero-indexed.
  return month_days[month - 1]

#🚨 Do NOT change any of the code below 
year = int(input("Enter a year: "))
month = int(input("Enter a month: "))
days = days_in_month(year, month)
print(days)