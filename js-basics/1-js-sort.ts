// Questions on JavaScript Array Sort
// Basic Sorting:

// Given the array [7, 3, 9, 1, 4], how would you sort it in ascending order using the sort() method?

/*
    A negative value if a should be before b (i.e., a - b < 0).
    Zero if a and b are considered equal (i.e., a - b === 0).
    A positive value if a should be after b (i.e., a - b > 0).
*/

const array = [7, 3, 9, 1, 4];
const ascendingArray = [...array].sort((a, b) => a - b);
console.log({ ascendingArray });

// How would you sort an array of numbers [5, 2, 8, 3, 1] in descending order using a custom comparator function?
const descendingArray = [...array].sort((a, b) => b - a);
console.log({ descendingArray });

// Given an array of strings ['cat', 'dog', 'elephant', 'bee'], what will be the result of using the sort() method without any parameters?
// Object Sorting:

const strings = ["cat", "dog", "elephant", "bee"];
const s = [...strings].sort();
console.log({ s });

// Given the array of objects [{age: 30}, {age: 20}, {age: 25}], how would you sort the objects by the age property in ascending order?
// Locale Compare:

const objects = [{ age: 30 }, { age: 20 }, { age: 25 }];
const sortedByAge = objects.sort((a, b) => a.age - b.age);
console.log({ sortedByAge });

// Why might you use localeCompare when sorting strings? Give an example of sorting an array of strings ['ä', 'a', 'z'] in the correct order using localeCompare.
// Stability:

// What is a stable sort and is the JavaScript sort() method stable?
