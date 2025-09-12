### 1) What is the difference between var, let, and const?

var can be redeclared in the same scope but let and const cannot be redeclared.

### 2)What is the difference between map(), forEach(), and filter()?

<mark>forEach()</mark> executes a funciton once for each element in the array and doesn't return a new array.

<mark>map</mark> executes a function on each element and returns a new array of the new value.

<mark>filter()</mark> executes a function on each elements and returns a new array where the element matches with the condition.

### 3) What are arrow functions in ES6?

Arrow function is shorter expression of function expression.

<code> let myFunc = (a, b) => a+b;</code>

### 4) How does destructuring assignment work in ES6?

Destructuring is way to extract values from array and objects into distinct variables in a single statements.

<code>  
const num = [10, 20, 30];

const [a, b, c] = num;
</code>

### 5)Explain template literals in ES6. How are they different from string concatenation?

Template literals are dynamic strings introduced in es6 and provides a cleaner alternatives to traditional string concatenation.  
<code> const string = `This   
is  
a multi    
line string`;  
const a = 5;  
const b = 10;  
console.log(`The sum of ${a} and ${b} is ${a + b}`);
</code>
