type GroupByFunction<T> = (array: T[], by: keyof T) => Record<string, T[]>;

const groupBy: GroupByFunction<any> = (array, by) => {
  return array.reduce((prev, curr) => {
    const value = curr[by];
    if (!prev[value]) {
      prev[value] = [curr];
    } else {
      prev[value].push(curr);
    }
    return prev;
  }, {} as Record<string, any[]>);
};

// Example usage
const people = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "San Francisco" },
  { name: "Charlie", age: 25, city: "New York" },
  { name: "David", age: 30, city: "San Francisco" },
  { name: "Eve", age: 35, city: "Los Angeles" },
];

console.log(groupBy(people, "city"));
/*
{
  "New York": [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Charlie", age: 25, city: "New York" }
  ],
  "San Francisco": [
    { name: "Bob", age: 30, city: "San Francisco" },
    { name: "David", age: 30, city: "San Francisco" }
  ],
  "Los Angeles": [
    { name: "Eve", age: 35, city: "Los Angeles" }
  ]
}
*/
