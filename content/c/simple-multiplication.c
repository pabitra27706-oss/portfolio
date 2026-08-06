#include <stdio.h>

int main()
{
    int n, num, multi=1;
    printf("Enter how many numbers you want to multiply:");
    scanf("%d",&n);
    for (int i=1;i<=n;i++){
        printf("Enter number %d:",i);
        scanf("%d",&num);
        multi=multi*num;
    };
    printf("Multiplication=%d",multi);   
    return 0; 
}