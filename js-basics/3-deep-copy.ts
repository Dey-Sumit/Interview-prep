/*
The term "deep clone" is not formally defined in JavaScript's language specification, but is generally well understood in the community.
A deep clone makes a copy of JavaScript value, leading to a completely new value that has no references pointing back to the properties in the original object (if it's an object).
Any changes made to the deep-copied object will not affect the original object.

Implement a deepClone function that performs a deep clone operation on JavaScript objects. 
You can assume the input only contains JSON-serializable values (null, boolean, number, string, Array, Object) and will not contain any other objects like Date, Regex, Map or Set.
*/

// https://www.greatfrontend.com/questions/javascript/deep-clone

// In js this is how we can create deepClone
/* 

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}; */

export default function deepClone<T>(value: T): T {
  // primitive type case
  if (value === null || typeof value !== "object") {
    return value;
  }

  const result = (Array.isArray(value) ? [] : {}) as T;

  for (const key in value) {
    // first discard the useless default props that comes with an object
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key]); // it returns the inner result , which populates(either it's array or object, result[key]) the upper result
    }
  }

  return result;
}

const copied = deepClone({
  a: [1, 2, 4],
  b: {
    a: "12",
  },
});

console.log({ copied });
