age_in=input('What is your current age:')
age=float(age_in)
#t=total
t_year=90
t_weeks=(52*90)
t_days=(365*90)
#c=current
c_year=(age)
c_weeks=(age*52)
c_days=(age*365)
#remain
r_years=(t_year-c_year)
r_weeks=(t_weeks-c_weeks)
r_days=(t_days-c_weeks)
print(f'You have {r_days} days left,{r_weeks} weeks, {r_years} left',)