/* const add1 = (x) => x + 1;
const multiply = (x) => x * 2;
const subtract = (x) => x - 3;

const pipedFunction = pipe(add, multiply, subtract);

console.log(pipedFunction(5)); // Should output: 9
 */

const pipe = (...args: Function[]) => {
  return <T>(arg: T) =>
    args.reduce((prev, curr) => {
      return curr(prev);
    }, arg);
};

const add = (x) => x + 1;
const multiply = (x) => x * 2;
const subtract = (x) => x - 3;
const pipedFunction = pipe(add, multiply, subtract);

console.log(pipedFunction(5)); // Should output: 9
//----------------------------------------

/* 
Input:
{
  a : {
    b : (a,b,c) => a+b+c,
    c : (a,b,c) => a+b-c,
  },
  d : (a,b,c) => a-b-c
}

Fn(obj)(1,1,1); */

const Fn = (obj: Record<string, any>) => {
  return (...args) => {
    
  };
};
