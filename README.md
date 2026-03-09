## 1️⃣ What is the difference between var, let, and const?

Ans: In JavaScript, var, let, and const are all used to declare variables — but they behave differently in scope, reassignment, and hoisting.

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


## 2️⃣ What is the spread operator (...)?