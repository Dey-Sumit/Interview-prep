export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

export function isFunction(value: unknown): boolean {
  return typeof value === "function";
}

// This function returns true for any value that is an object or a function, excluding null.
export function isObject(value: unknown): boolean {
  // return  value instanceof Object && value !== null
  return (typeof value === "object" && value !== null) || typeof value === "function";
}

// This function returns true only for plain objects, which are either created by the Object constructor
// or have a null prototype (such as those created by Object.create(null))
export function isPlainObject(value: unknown): boolean {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  // Check if value is created by the Object constructor or Object.create(null)
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/*
Examples :

Arrays and Date objects are not considered plain objects in JavaScript. Here's a more detailed explanation:

Arrays:
Type Check: Arrays are special objects in JavaScript. When using typeof on an array, it returns "object".
Plain Object Check: Arrays are not plain objects because their prototype is not Object.prototype. Instead, their prototype is Array.prototype.

Date Objects:
Type Check: Date objects are also considered objects. Using typeof on a date returns "object".
Plain Object Check: Date objects are not plain objects because their prototype is not Object.prototype. Instead, their prototype is Date.prototype.


*/
