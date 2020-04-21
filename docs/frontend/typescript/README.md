# [TypeScript](https://www.typescriptlang.org/)

## [写给初中级前端的高级进阶指南](https://juejin.im/post/5e7c08bde51d455c4c66ddad#heading-0)

## [TypeScript handbook 入门教程](https://zhongsp.gitbooks.io/typescript-handbook/content/)

### TS的基本类型

#### Boolean

``` ts
let isDone:boolean = false;
```

#### Number

``` ts
let decimal :number = 5;
let hex:number = 0xfe80;
let binary:number = 0b0101;
let octal:number = 0o744;
```

#### String

``` ts
let color : string = "blue";
color = "red";
```

使用模板语法

``` ts
let fullName:string = `Three Stome`;
let age:number = 26;
let sentece:string = `Hello,my name is ${fullName},I be ${age+1} years old next month;`;
```

#### Array

``` ts
let list：number[] = [1,2,3];
let list:Array = [1,2,3];
```

#### Tuple

``` ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

::: danger
Type 'number' is not assignable to type 'string'.
Type 'string' is not assignable to type 'number'.
:::

#### Enum

``` ts
enum Color{
    Red,
    Green,
    Blue
}
let c:Color = Color:Green;
```

枚举默认从0开始，可以改变初始位置序号

``` ts
enum Color{
    Red = 1，
    Green，
    Blue
}
let c:Color = Color:Green;
//也可以设置各自的序号
enum Color{
    Red=1,
    Green=2,
    BLue=4
}
let c:Color = Color:Green;
```

#### Any

``` ts
let notSure:any = 4;
notSure = 'maybe a string inttead';
notSure = false; //okay,definitely a boolean
```

``` ts
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;

::: danger
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
Property 'toFixed' does not exist on type 'Object'.
:::

```

#### Void

``` ts
function warnUser(): void {
  console.log("This is my warning message");
}
```

#### Null and Undefined

``` ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

#### Never

``` ts
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while (true) {}
}
```

#### Object

``` ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
::: danger
Argument of type '42' is not assignable to parameter of type 'object | null'.
:::
create("string"); // Error
::: danger
Argument of type '"string"' is not assignable to parameter of type 'object | null'.
:::
create(false); // Error
::: danger
Argument of type 'false' is not assignable to parameter of type 'object | null'.
:::
create(undefined); // Error
::: daner
Argument of type 'undefined' is not assignable to parameter of type 'object | null'
:::
```

#### TypeAsseration

``` ts
let someValue: any = "this is a string";

let strLength: number = (someValue).length;
```

### 高级类型

#### Intersection Type

intersection type可以将几个类型的属性组合到一起，在mixin中使用较多：

``` ts
function extend<First, Second>(first: First, second: Second): First & Second {
    const result: Partial<First & Second> = {};
    for (const prop in first) {
        if (first.hasOwnProperty(prop)) {
            (result as First)[prop] = first[prop];
        }
    }
    for (const prop in second) {
        if (second.hasOwnProperty(prop)) {
            (result as Second)[prop] = second[prop];
        }
    }
    return result as First & Second;
}

class Person {
    constructor(public name: string) { }
}

interface Loggable {
    log(name: string): void;
}

class ConsoleLogger implements Loggable {
    log(name) {
        console.log(`Hello, I'm ${name}.`);
    }
}

const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);
```

