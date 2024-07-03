import React, { useState } from "react";
import { useDebouncedCallback } from "../1-use-debounce";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const fetchResults = (searchQuery: string) => {
    // Simulate an API call
    console.log("Fetching results for:", searchQuery);
    setResults([...results, `Result for ${searchQuery}`]);
  };

  const debouncedFetchResults = useDebouncedCallback(fetchResults, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    debouncedFetchResults(newQuery);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} placeholder="Search..." />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
