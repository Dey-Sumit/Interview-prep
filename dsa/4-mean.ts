// Implement a function mean(array) that returns the mean (also known as average) of the values inside array, which is an array of numbers.

function mean(array: number[]) {
  if (array.length === 0) {
    return NaN;
  }

  const sum = array.reduce((acc, value) => acc + value, 0);
  return sum / array.length;
}

// Examples
console.log(mean([1, 2, 3, 4, 5])); // Output: 3
console.log(mean([10, 20, 30, 40])); // Output: 25
console.log(mean([])); // Output: NaN
