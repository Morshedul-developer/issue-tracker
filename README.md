# 1️⃣ What is the difference between var, let, and const?

#### Ans:<br>

##### In JavaScript, var, let, and const are all used to declare variables — but they behave differently in scope, reassignment, and hoisting.

- var:<br>
  It is functioned scoped and ignores {} blocks like if, for etc.

      It also can reassigned and can be redeclared.<br>
      Ex:<br>
      var a = 5;<br>
      var a = 10; // This is allowed<br>
      a = 20;     // This is allowed

      It is hoisted and initialized as "undefined".<br>
      Ex:<br>
      console.log(b); // undefined<br>
      var b = 5;

- let:<br>
  It is blocked-scoped.

      It also can reassigned and but cannot be redeclared.<br>
      Ex:<br>
      let c = 5;
      c = 10;      // allowed
      let c = 20;  // Error

      It is hoisted but not initialized. It exists in Temporal Dead Zone(TDZ).
      Ex:
      console.log(d); // ReferenceError
      let d = 5;

- const:<br>
  It is blocked-scoped.

      It cannot be reassigned and but cannot be redeclared.<br>
      Ex:<br>
      const e = 10;<br>
      e = 20; // Error

      It is hoisted but not initialized. It exists in Temporal Dead Zone(TDZ).
      Ex:<br>
      console.log(d); // ReferenceError<br>
      let d = 5;

# 2️⃣ What is the spread operator (...)?

#### Ans:<br>

##### Spread operator (...) is used to expand elements of an array or properties of an object into individual elements.

- It expands the elements of an array.<br>
  Ex:<br>
  const numbers = [1, 2, 3];<br>
  console.log(...numbers); // 1 2 3<br>

- Spread operator can create a shallow copy.<br>
  Ex:<br>
  const arr1 = [1, 2, 3];<br>
  const arr2 = [...arr1];<br>
  console.log(arr2); // [1, 2, 3]<br>

- Spread operator is also used to copy or merge objects.<br>
  Ex:<br>
  const user = {
  name: "John",
  age: 25
  };

  const newUser = {
  ...user,
  country: "USA"
  };

  console.log(newUser); // { name: "John", age: 25, country: "USA" }

# 3️⃣ What is the difference between map(), filter(), and forEach()?

#### Ans:<br>

##### map(), filter(), and forEach() each of the methods are JS array methods used to loop through arrays.

- map():<br>
  This method is used to transform each element of an array. We should remind that this method return a new array.<br>
  Ex:<br>
  const numbers = [1, 2, 3];

  const result = numbers.map(num => num \* 2);<br>
  console.log(result); // [2, 4, 6]

- filter():<br>
  This method is used to get elements based on a condition from an array. It also return a new array like map() method.

  Ex:<br>
  const numbers = [1, 2, 3, 4, 5];

  const result = numbers.filter(num => num > 3);<br>
  console.log(result); // [4, 5]

- forEach():<br>
  This method is only used for runs code for each element and it does not return a new array.

  Ex:<br>
  const numbers = [1, 2, 3];

  numbers.forEach(num => {
  console.log(num \* 2);
  }); // 2 4 6

# 4️⃣ What is an arrow function?

#### Ans:<br>

##### Arrow function: An arrow function is a shorter and more modern way to write functions in JS. This is a modern JavaScript feature (introduced in ES6).

It uses the '=>'(arrow) syntax.

Normal Function:<br>
function add(a, b) {<br>
return a + b;<br>
}

Arrow Function:<br>
const add = (a, b) => {<br>
return a + b;<br>
};

### There are many ways to write an arrow function, like:<br>

- Shorter Arrow Function

  const add = (a, b) => a + b;

- ExArrow Function with One Parameter

  const square = num => num \* num; // Here, the parentheses are optional.

- Arrow Function with No Parameter

  Use empty parentheses.

  const greet = () => {<br>
  console.log("Hello");<br>
  };

# 5️⃣ What are template literals?

#### Ans:<br>

##### Template literals: This is a modern JavaScript feature (introduced in ES6) used to create strings more easily using backticks(``) instead of quotes.

### The uses of Template literals:

- String Interpolation (Very Important)

  Before template literals:

  const name = "John";<br>
  const age = 25;

  const text = "My name is " + name + " and I am " + age;

  With template literals:

  const text = `My name is ${name} and I am ${age}`;

- Using Expressions

  const a = 5;
  const b = 10;

  console.log(`Sum is ${a + b}`); // Sum is 15

- Multi-line Strings

  Template literals allow multi-line text without \n.

  const text = `This is line one
This is line two
This is line three`;

  console.log(text);
