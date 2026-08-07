#include <stdio.h>

int main()
{
    int a,b,c;
    printf("Enter 3 numbers:");
    scanf("%d%d%d",&a,&b,&c);
    if (a>b)
    {
        if (a>c)
        {
            printf("%d is highest number among the 3 numbers.",a);
        }
        else
        {
            printf("%d is the highest number among the 3 numbers. ",c);
        }
    }
    else if (b>c)
    {
        printf("%d is the highest number among the 3 numbers. ",b);
    }
    else
    {
        printf("%d is the highest number among the 3 numbers. ",c);
    }
    return 0;
}