#Addition
def add(n1, n2):
  return n1 + n2
#Subtraction
def Subtraction(n1, n2):
  return n1-n2
#Multipeication
def Multipeication(n1, n2):
  return n1*n2
#Devide
def Devide(n1, n2):
  return n1/n2
operations={
  "+":add,
  "-":Subtraction,
  "*":Multipeication,
  "/":Devide,
}

num1=int(input("What's the first no: "))

for symbol in operations:
  print(symbol)
operations_symbol=input("Pick a operation for the above numbers calculations: ")
num2=int(input("What's the second no: "))
calculation_function=operations[operations_symbol]
answer = calculation_function(num1, num2)
print(f"{num1} {operations_symbol} {num2} = {answer}")





