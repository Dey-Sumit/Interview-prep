// https://bigfrontend.dev/problem/implement-curry
//  https://chat.openai.com/c/fb50cf76-77cd-49b0-855a-ad68174a30aa
/* Please implement a curry() function, which accepts a function and return a curried one.

Here is an example : 

const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
 */

// const curry = (fn) => {
//   const curriedFn = (...args) => {
//     return fn(...args);
//   };
//   return curriedFn;
// };

// curriedJoin(1, 2, 3) // '1_2_3'

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curry = (fn) => {
  const curriedFn = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs) => {
        return curriedFn(...args, ...moreArgs);
      };
    }
  };
  return curriedFn;
};

const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3));
console.log(curriedJoin(1, 2)(3));
console.log(curriedJoin(1)(3)(2));

const add = (a, b, c) => {
  return a + b + c;
};

const multiply = (a, b, c) => {
  return a * b * c;
};

const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);

curriedAdd(1, 2, 3); // Result : 6
curriedMultiply(1, 2, 4); // Result : 8
