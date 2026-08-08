print('Example 01:')
def formatted_name(name, s_name):
  format_name=name.title()
  format_s_name=s_name.title()
  return f"Your formatted name is {format_name} {format_s_name}"
print(formatted_name("pAbItRa", "cHaKrAbOrTtY"))

print("Example 02:")
def formatted_name(name, s_name):
  if name =="" or s_name=="":
    return "You entered invalid input...."
  format_name=name.title()
  format_s_name=s_name.title()
  return f"Your formatted name is {format_name} {format_s_name}"
print(formatted_name(input("What is your first name: "), input("What is your last name: ")))