

- Execution Context : The environment in which JavaScript code runs.
	- Memory Creation & Allocation Phase: When a code runs, the JavaScript engine allocates memory for variables and functions during this phase but does not execute any code. Variable declarations (but not initializations) and function declarations are hoisted* to the top of their scope.
	
	- Code Execution Phase: The JavaScript engine executes the code line by line, assigning values to variables and executing functions.
	
- Call Stack : JavaScript creates an execution context* for every function invocation. When a function is called, a new execution context is created and pushed onto the call stack. When the function completes, its execution context is popped off the call stack.
	- since JS has only one call stack, so JS is a single threaded, synchronous language.
	- On this note , remember one error : Maxm Call Stack size exceeded. xD

- Hoisting : Hoisting refers to JavaScript's process where the JS engine moves the declaration of functions and variables to the top of their scope during memory creation phase (before code execution).
  While var (with an initial value of undefined) and function declarations are fully hoisted, let, const, and arrow functions are hoisted but remain uninitialized, existing in a "temporal dead zone"* until the code execution reaches their declaration.

- The temporal dead zone : It's the period between entering a block scope* and the execution of the variable's declaration code (let or const) within that block. During this period, any attempt to access these variables will result in a ReferenceError

-  Lexical Scope :
	- Global Scope: Variables declared outside any function or block are in the global scope, accessible from anywhere in the code.
	- Local Scope : 
		- Function Scope: Variables declared within a function are local to that function and cannot be accessed outside of it. This applies to variables declared with var.
		- Block Scope: Variables declared with let or const within a block ({}) are only accessible within that specific block, unlike var, which is function-scoped even when declared inside a block.
		
- Lexical Environment: is like a container that stores the variables and functions for a specific scope. It keeps track of what variables and functions are available in the global scope, function scope, or block scope, ensuring they can only be accessed within their defined scope.
  This means variables declared in a block are only accessible within that block, and variables declared in a function are only accessible within that function.
  
- The Scope Chain : The Lexical Environment works similarly to a linked list in the call stack. Each execution context has a reference to its outer lexical environment, creating a chain. This is called scope chain
  This chain allows JavaScript to resolve variable references by looking up the chain, from the current context to the global context, ensuring that each variable is found in the correct scope.
  
- Clousure : A closure is a function bundled with its lexical scope. When a function is returned from another (outer) function, it retains access to the variables in the outer function's lexical scope, even after the outer function has finished executing. 
  This means the returned function remembers the variables and references from the scope it was defined in. It's not just the function alone that is returned, but the entire closure.This enabled many advanced js patterns like currying, memoization, Module Pattern / private variables etc.

- Shadowing: Occurs when a variable in a local scope has the same name as a variable in an outer scope, overriding the outer one in its scope.

