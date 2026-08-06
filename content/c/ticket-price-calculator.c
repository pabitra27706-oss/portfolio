#include <stdio.h>

int main()
{
    int age, base_price, surcharge, s_discount, n, f_discount;
    float per_ticket_price, total_price;
    char weekend, student;
    
    printf("Please enter your age: ");
    scanf("%d", &age);
    
    printf("Is it weekend (y/n): ");
    scanf(" %c", &weekend);  
    
    printf("Are you a student with valid ID (y/n): ");  
    scanf(" %c", &student); 
    
    printf("How many tickets you want to buy: ");  
    scanf("%d", &n);   
    
    if (age >= 0 && age <= 12) 
    {
        base_price = 100;
    } 
    else if (age > 12 && age < 60) 
    {
        base_price = 250;
    } 
    else if (age >= 60) 
    {
        base_price = 150;
    } 
    else 
    {
        printf("Enter a valid age.\n");
        return 1;
    }
    printf("Base price: ₹%d\n", base_price);
    
    if (weekend == 'y' || weekend == 'Y') 
    {
        surcharge = 50;
    } 
    else 
    {
        surcharge = 0;
    }
    printf("Weekend surcharge: ₹%d\n", surcharge);
    
    base_price += surcharge;
    
    if (student == 'y' || student == 'Y') 
    {
        s_discount = base_price / 5;
        printf("Student discount (-20%%): -₹%d\n", s_discount);
    } 
    else 
    {
        s_discount = 0;
    }
    base_price -= s_discount;
    
    printf("Subtotal per ticket: ₹%d\n", base_price);
    
    if (n >= 4) 
    {
        f_discount = base_price / 10;
        printf("Group discount (-10%%): -₹%d\n", f_discount);
    } 
    else 
    {
        f_discount = 0;
    }
    base_price -= f_discount;
    
    per_ticket_price = base_price;
    total_price = per_ticket_price * n;
    
    
    printf("Final per ticket: ₹%.2f\n", per_ticket_price);
    printf("Number of tickets: %d\n", n);
    printf("Total price: ₹%.2f\n", total_price);
    
    return 0;
}