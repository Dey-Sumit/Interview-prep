// ! SOME CRAZY TS HAPPENING HERE

/* // Recursive type to flatten the array to a specified depth
type FlatArray1<Arr, Depth extends number> = {
  // Base case: if Depth is 0, the type remains the same
  0: Arr;
  // Recursive case: flatten the array one level, then apply FlatArray again
  1: Arr extends ReadonlyArray<infer InnerArr> ? FlatArray<InnerArr, DepthMinusOne<Depth>> : Arr;
}[Depth extends 0 ? 0 : 1];

// Utility type to decrement a number type
type DepthMinusOne<N extends number> = ((...args: any[]) => void) extends (
  first: any,
  ...rest: infer R
) => void
  ? R["length"]
  : never;

// Extend the Array interface with the new flat method
interface Array<T> {
  flat<D extends number = 1>(this: T[], depth?: D): FlatArray<T, D>[];
}

// Check if Array.prototype.flat already exists
if (!Array.prototype.flat) {
  // Define the flat method if it doesn't exist
  Array.prototype.flat = function <T, D extends number = 1>(
    this: T[],
    depth: D = 1 as D
  ): FlatArray<T, D>[] {
    // Helper function to flatten the array
    const flatten = (arr: any[], depth: number): any[] => {
      // Base case: return the array if depth is less than 1
      if (depth < 1) return arr;

      // Reduce the array, flattening one level deep
      return arr.reduce((acc, val) => {
        // If the value is an array, recursively flatten it
        if (Array.isArray(val)) {
          acc.push(...flatten(val, depth - 1));
        } else {
          // If the value is not an array, push it directly
          acc.push(val);
        }
        return acc;
      }, []);
    };

    // Call the flatten function on the current array
    return flatten(this, depth);
  };
}

// Example usage
const nestedArray = [1, [2, [3, [4, 5]]]];
console.log(nestedArray.flat()); // Outputs: [1, 2, [3, [4, 5]]]
console.log(nestedArray.flat(2)); // Outputs: [1, 2, 3, [4, 5]]
console.log(nestedArray.flat(3)); // Outputs
 */

/* /// Check if Array.prototype.flat already exists
if (!Array.prototype.flat) {
  // Define the flat method if it doesn't exist
  //@ts-ignore
  Array.prototype.flat = function <T>(this: T[], depth: number = 1): T[] {
    // Helper function to flatten the array
    const flatten = (arr: any[], depth: number): any[] => {
      // Base case: return the array if depth is less than 1
      if (depth < 1) return arr;

      // Reduce the array, flattening one level deep
      return arr.reduce((acc, val) => {
        // If the value is an array, recursively flatten it
        if (Array.isArray(val)) {
          acc.push(...flatten(val, depth - 1));
        } else {
          // If the value is not an array, push it directly
          acc.push(val);
        }
        return acc;
      }, []);
    };

    // Call the flatten function on the current array
    return flatten(this, depth);
  };
}

// Example usage
const nestedArray = [1, [2, [3, [4, 5]]]];
console.log(nestedArray.flat()); // Outputs: [1, 2, [3, [4, 5]]]
console.log(nestedArray.flat(2)); // Outputs: [1, 2, 3, [4, 5]]
console.log(nestedArray.flat(3)); // Outputs: [1, 2, 3, 4, 5]
 */

const categories = [
  "Electronics",
  ["Computers", ["Laptops", "Desktops"]],
  ["Mobiles", ["Smartphones", ["Android", "iOS"], "Feature Phones"]],
  "Home Appliances",
  ["Kitchen", ["Microwave", "Refrigerator"]],
];

/* const flatArray = (inputArray: any[], depth: number = Infinity) => {
  if (!Array.isArray(inputArray)) {
    throw Error("Input is not a type of array");
  }

  const flatten = (inputArray: any[], depth: number) => {
    if (depth < 1) return inputArray;

    return inputArray.reduce((acc, curr) => {
      if (Array.isArray(curr)) {
        acc.push(...flatArray(curr, depth - 1));
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  };
  return flatten(inputArray, depth);
}; */

const flatArray = (inputs, depth = Infinity) => {
  const inner = (inputArray, currentDepth) => {
    if (!Array.isArray(inputArray) || currentDepth === 0) {
      return [inputArray];
    }

    return inputArray.reduce((acc, curr) => {
      acc.push(...inner(curr, currentDepth - 1));
      return acc;
    }, []);
  };

  return inner(inputs, depth);
};
flatArray(categories);
