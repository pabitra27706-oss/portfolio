#include <stdio.h>

int main()
{
    float t_marks, f_marks, marks;
    float p_marks ;
    printf("Enter total marks you got:");
    scanf("%f",&t_marks);
    printf("Enter full marks of the exam:");
    scanf("%f",&f_marks);

    
    p_marks = (t_marks*100)/f_marks ;
    if (p_marks>=90)
    {
    printf("You score %f percent in exam and get a grade of A",p_marks);
    }
    else if (p_marks>=80)
    {
    printf("You score %f percent in exam and get a grade of B",p_marks);
    }
    else if (p_marks>=70)
    {
    printf("You score %f percent in exam and get a grade of C",p_marks);
    }
    else if (p_marks>=60)
    {
    printf("You score %f percent in exam and get a grade of D",p_marks);
    }
    else {printf("You score %f percent and you fail.",p_marks);}
    return 0;
}