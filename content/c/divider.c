#include <stdio.h>

int main()
{
    int dividend, divisor, quotient, reminder ;
    printf("Enter the Dividend:");
    scanf("%d",&dividend);
    printf("Enter the Divisor:");
    scanf("%d",&divisor);
    quotient =dividend/divisor;
    reminder =dividend%divisor;
    printf("Quotient=%d\n",quotient);
    printf("Reminder=%d",reminder);
    return 0;
}