function maxProductSubarray(nums: number[]) {
  let minProduct = nums[0];
  let maxProduct = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Handle negative number case : Since multiplying by a negative number swaps the roles of max and min,
    // we swap maxProduct and minProduct when encountering a negative number.
    if (nums[i] < 0) {
      [maxProduct, minProduct] = [minProduct, maxProduct];
    }

    // Determine the new maxProduct. If nums[i] is greater than nums[i] * maxProduct,
    if (nums[i] > nums[i] * maxProduct) {
      maxProduct = nums[i];
    } else {
      maxProduct = nums[i] * maxProduct;
    }
    // SAME AS: maxProduct = Math.max(nums[i], nums[i] * maxProduct);

    // Determine the new minProduct to keep track of the minimum product up to this point.
    minProduct = Math.min(nums[i], nums[i] * minProduct);

    // Update the result with the maximum product found so far.
    if (maxProduct > result) {
      result = maxProduct;
    }
    // SAME AS: result = Math.max(maxProduct, result);
  }

  return result;
}

function maxProductSubarraySubset(nums: number[]) {
  let minProduct = nums[0];
  let maxProduct = nums[0];
  let result = nums[0];

  // Variables to track the start and end of the max product subarray
  let start = 0;
  let end = 0;
  let tempStart = 0; // Temporary start index to start a potential new array

  for (let i = 1; i < nums.length; i++) {
    // Since multiplying by a negative number swaps the roles of max and min,
    // we swap maxProduct and minProduct when encountering a negative number.
    if (nums[i] < 0) {
      [maxProduct, minProduct] = [minProduct, maxProduct];
    }

    // Determine the new maxProduct. If nums[i] is greater than nums[i] * maxProduct,
    // start a new subarray from nums[i].
    if (nums[i] > nums[i] * maxProduct) {
      maxProduct = nums[i];
      tempStart = i; // Update temporary start index
    } else {
      maxProduct = nums[i] * maxProduct;
    }

    // Determine the new minProduct to keep track of the minimum product up to this point.
    minProduct = Math.min(nums[i], nums[i] * minProduct);

    // If the current maxProduct is greater than the result,
    // update the result and the start and end indices.
    if (maxProduct > result) {
      result = maxProduct;
      start = tempStart; // Update start index to tempStart
      end = i; // Update end index to current index
    }
  }

  // Return the subarray that gives the maximum product
  return nums.slice(start, end + 1); // end is not included in slice, so +1
}

// Example usage:
console.log(maxProductSubarraySubset([2, 3, -2, 4, 2])); // Output: [2, 3]
console.log(maxProductSubarray([2, 3, -2, 4, 2])); // Output: 8
