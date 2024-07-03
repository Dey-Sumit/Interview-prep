// Longest Substring Without Repeating Characters
// Longest Repeating Character Replacement
// Minimum Window Substring
// Valid Anagram
// Group Anagrams
// Valid Parentheses
// Valid Palindrome
// Longest Palindromic Substring
// Palindromic Substrings
// Encode and Decode Strings (Leetcode Premium)

const lengthOfLongestSubstring = function (s: string) {
  const record: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) {
    if (record[s[i]]) {
      return i++;
    } else {
      record[s[i]] = 1;
    }
  }
  return s.length;
};
