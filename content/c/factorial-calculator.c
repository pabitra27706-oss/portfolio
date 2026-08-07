#include <stdio.h>
int main()
{
    int n,multi=1,i;
    printf("Enter a number:");  
    scanf("%d",&n);
    for (i=1;i<=n;i++)
    {
        multi = i * multi ;
    }
    printf("Factorial=%d",multi);
    return 0;
    
}