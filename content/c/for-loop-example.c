#include <stdio.h>

/* ============================================
   FOR LOOP EXAMPLES IN C
   Demonstrates various for loop use cases
   ============================================ */

int main() {

    /* ============================================
       1. BASIC FOR LOOP
       ============================================ */

    printf("=== 1. Basic For Loop ===\n");

    for (int i = 0; i < 5; i++) {
        printf("i = %d\n", i);
    }

    /* Output:
       i = 0
       i = 1
       i = 2
       i = 3
       i = 4
    */

    /* ============================================
       2. FOR LOOP COUNTING BACKWARDS
       ============================================ */

    printf("\n=== 2. Counting Backwards ===\n");

    for (int i = 5; i > 0; i--) {
        printf("i = %d\n", i);
    }

    /* Output:
       i = 5
       i = 4
       i = 3
       i = 2
       i = 1
    */

    /* ============================================
       3. FOR LOOP WITH STEP
       ============================================ */

    printf("\n=== 3. For Loop With Step ===\n");

    for (int i = 0; i <= 10; i += 2) {
        printf("i = %d\n", i);
    }

    /* Output:
       i = 0
       i = 2
       i = 4
       i = 6
       i = 8
       i = 10
    */

    /* ============================================
       4. FOR LOOP WITH ARRAY
       ============================================ */

    printf("\n=== 4. For Loop With Array ===\n");

    int numbers[] = {10, 20, 30, 40, 50};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    for (int i = 0; i < size; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }

    /* Output:
       numbers[0] = 10
       numbers[1] = 20
       numbers[2] = 30
       numbers[3] = 40
       numbers[4] = 50
    */

    /* ============================================
       5. NESTED FOR LOOP
       ============================================ */

    printf("\n=== 5. Nested For Loop ===\n");

    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            printf("i = %d, j = %d\n", i, j);
        }
    }

    /* Output:
       i = 1, j = 1
       i = 1, j = 2
       i = 1, j = 3
       i = 2, j = 1
       ...
    */

    /* ============================================
       6. FOR LOOP WITH BREAK
       ============================================ */

    printf("\n=== 6. For Loop With Break ===\n");

    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            printf("Breaking at i = %d\n", i);
            break;
        }
        printf("i = %d\n", i);
    }

    /* Output:
       i = 0
       i = 1
       i = 2
       i = 3
       i = 4
       Breaking at i = 5
    */

    /* ============================================
       7. FOR LOOP WITH CONTINUE
       ============================================ */

    printf("\n=== 7. For Loop With Continue ===\n");

    for (int i = 0; i < 7; i++) {
        if (i % 2 == 0) {
            continue;   /* skip even numbers */
        }
        printf("i = %d\n", i);
    }

    /* Output:
       i = 1
       i = 3
       i = 5
    */

    /* ============================================
       8. FOR LOOP SUM CALCULATION
       ============================================ */

    printf("\n=== 8. Sum Calculation ===\n");

    int sum = 0;

    for (int i = 1; i <= 10; i++) {
        sum += i;
    }

    printf("Sum of 1 to 10 = %d\n", sum);

    /* Output:
       Sum of 1 to 10 = 55
    */

    /* ============================================
       9. FOR LOOP MULTIPLICATION TABLE
       ============================================ */

    printf("\n=== 9. Multiplication Table ===\n");

    int table = 5;

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", table, i, table * i);
    }

    /* Output:
       5 x 1 = 5
       5 x 2 = 10
       5 x 3 = 15
       ...
       5 x 10 = 50
    */

    /* ============================================
       10. INFINITE FOR LOOP WITH BREAK
       ============================================ */

    printf("\n=== 10. Infinite Loop With Break ===\n");

    int count = 0;

    for (;;) {
        count++;
        printf("count = %d\n", count);
        if (count == 3) {
            printf("Reached 3, stopping!\n");
            break;
        }
    }

    /* Output:
       count = 1
       count = 2
       count = 3
       Reached 3, stopping!
    */

    return 0;
}