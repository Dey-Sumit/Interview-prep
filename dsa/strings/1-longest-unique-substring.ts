const longestUniqueSubString = (input: string) => {
  // Initialize the left boundary of the sliding window
  let left = 0;

  // Initialize the maximum length of the substring without repeating characters
  let maxLengthWindow = 0;

  // Initialize a map to record the last occurrence index of each character
  const charIndexMap = new Map();

  // Iterate through the string with the right boundary of the sliding window
  for (let right = 0; right < input.length; right++) {
    // If the character at the right boundary is already in the map (repeating character),
    // move the left boundary to the right of the last occurrence of this character
    if (charIndexMap.has(input[right])) {
      // Update left to be the maximum of the current left and the next position of the last occurrence
      left = Math.max(left, charIndexMap.get(input[right]) + 1);
    }

    // Update the map with the current character's index (last occurrence)
    charIndexMap.set(input[right], right);

    // Calculate the length of the current window and update the max length if it's larger
    // maxLengthWindow = Math.max(maxLengthWindow, right - left + 1);
    // Update the max length if the current window is longer
    const currentWindowLength = right - left + 1;
    if (currentWindowLength > maxLengthWindow) {
      maxLengthWindow = currentWindowLength;
    }
  }

  // Return the maximum length of substring without repeating characters
  return maxLengthWindow;
};
const longestUniqueSubStringSubArray = (input: string) => {
  // Initialize the left boundary of the sliding window
  let left = 0;

  // Initialize the maximum length of the substring without repeating characters
  let maxLengthWindow = 0;

  // Initialize a map to record the last occurrence index of each character
  const charIndexMap = new Map();

  let startIndex = 0; // to keep track of the start index of the longest unique substring

  // Iterate through the string with the right boundary of the sliding window
  for (let right = 0; right < input.length; right++) {
    // If the character at the right boundary is already in the map (repeating character),
    // move the left boundary to the right of the last occurrence of this character
    if (charIndexMap.has(input[right])) {
      // Update left to be the maximum of the current left and the next position of the last occurrence
      left = Math.max(left, charIndexMap.get(input[right]) + 1);
    }

    // Update the map with the current character's index (last occurrence)
    charIndexMap.set(input[right], right);

    // Calculate the length of the current window
    const currentWindowLength = right - left + 1;

    // Update the max length if the current window is longer
    if (currentWindowLength > maxLengthWindow) {
      maxLengthWindow = currentWindowLength;
      startIndex = left; // update the start index of the longest unique substring
    }
  }

  const longestSubstring = input.slice(startIndex, startIndex + maxLengthWindow);
  // Return the maximum length of substring without repeating characters
  return longestSubstring;
};

longestUniqueSubString("pwwkewa");
