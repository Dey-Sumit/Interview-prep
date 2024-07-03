/*
Given an array of integers nums and an integer target, check if there are three numbers in the array such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You should return true or false.
*/

// Input: nums = [1, 2, 3, 5, 6, 11, 15, 16, 17, 18], target = 20
// Output: true
// Output: Because nums[1] + nums[2] + nums[6] == 20, we return true.

const nums = [1, 6, 2, 3, 5, 11, 15, 16, 17, 18];
const target = 20;

const hasThreeSum = (numbers: number[], target: number) => {
  // need to sort the array first, and as it does not want the indexes so, it's fine to mutate sort
  numbers.sort((a, b) => a - b);

  for (let i = 0; i < numbers.length - 2; i++) {
    let left = i + 1;
    let right = numbers.length - 1;
    const remainingSum = target - numbers[i];

    while (left < right) {
      const currentSum = numbers[left] + numbers[right];
      if (remainingSum === currentSum) {
        return true;
      }
      if (currentSum > remainingSum) {
        right--;
      } else {
        left++;
      }
    }
  }
  return false;
};

// function hasThreeSum(nums: number[], target: number): boolean {
//   nums.sort((a, b) => a - b);

//   for (let i = 0; i < nums.length - 2; i++) {
//     let left = i + 1;
//     let right = nums.length - 1;
//     const remainingSum = target - nums[i];

//     while (left < right) {
//       const currentSum = nums[left] + nums[right];
//       if (currentSum === remainingSum) {
//         // Found a triplet whose sum equals the remainingSum
//         return true;
//       } else if (currentSum < remainingSum) {
//         // Move the left pointer to increase the sum
//         left++;
//       } else {
//         // Move the right pointer to decrease the sum
//         right--;
//       }
//     }
//   }

//   return false; // No triplet found
// }

console.log(hasThreeSum(nums, target));
