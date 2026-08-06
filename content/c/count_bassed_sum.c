#include <stdio.h>

int main()
{
    int n,num, sum=0;
    printf("How many numbers do you want to sum:");
    scanf("%d",&n);
    for(int i=1;i<=n; i++){
        printf("Enter numbers:");
        scanf("%d",&num);
        sum+=num;
    }
    printf("Sum=%d",sum);
    return 0;
        
}