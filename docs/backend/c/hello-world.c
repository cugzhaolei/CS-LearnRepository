#include <stdio.h>

int main(void)
{
    printf("hello world");

    printf("%-5d\n", 123); // 输出为 "123
    printf("%5d\n", 123);  // 输出为 " 123
    printf("%s says it is %i o'clock\n", "Ben", 21);
    printf("%s will come tonight\n", "Jane");
    printf("%+d\n", 12);  // 输出 +12
    printf("%+d\n", -12); // 输出 -12
    // 输出 Number is 0.50
    printf("Number is %.2f\n", 0.5);
    // 输出为 " 0.50"
    printf("%6.2f\n", 0.5);

    printf("%*.*f\n", 6, 2, 0.5);
    // 等同于
    printf("%6.2f\n", 0.5);
    // 输出 hello
    printf("%.5s\n", "hello world");

    return 0;
}