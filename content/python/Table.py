from prettytable import PrettyTable
table=PrettyTable()
table.add_column("Pokemon_name", ["Pikachu",  "Charijard",  "Fhonix "])
table.add_column("Type", ["Electic",  "Fire", "Fire"])
table.align = "l"
print(table)

print("This make it with prettytable")
print("For more informatin visit-- https://pypi.org/project/prettytable/")