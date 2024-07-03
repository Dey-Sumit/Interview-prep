/*
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
 */

const twoSumSortedArray = (numbers: number[], target: number) => {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  console.log({ sortedNumbers });
  let pointerStart = 0,
    pointerEnd = sortedNumbers.length - 1;

  while (pointerStart !== pointerEnd) {
    const currentSum = sortedNumbers[pointerStart] + sortedNumbers[pointerEnd];
    if (sortedNumbers[pointerStart] + sortedNumbers[pointerEnd] === target) {
      return [pointerStart, pointerEnd];
    } else {
      if (currentSum > target) pointerEnd--;
      else pointerStart++;
    }
  }
  return "Not found";

  // two pointes, first + second > target , second pointer should be decreased else first
};

// const data = twoSumSortedArray([2, 7, 15, 11], 18);
// console.log({ data });

// ---------------------------------------------------

/*
 [2,15,11,7]

{
    2:0,
    7:1,
    15:2,
}
*/
// with record : better solution
const twoSum = (numbers: number[], target: number) => {
  const record = new Map<number, number>();
  for (let i = 0; i <= numbers.length; i++) {
    const compliment = target - numbers[i];
    if (record.get(compliment)) {
      return [record.get(compliment), i];
    }
    record.set(numbers[i], i);
  }

  return "No pair found";
};
