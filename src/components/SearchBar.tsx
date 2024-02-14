import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

interface ApiResData {
  count: number;
  next: 
}

export const SearchBar: FC = () => {
  const [input, setInput] = useState("");

  const fetchData = (value: string) => {
    fetch(`https://swapi.dev/api/people/?search=${value}`)
      .then((resp) => resp.json())
      .then((json) => {
        const results = json.filter((person) => {
          return value && person;
        });
        console.log(results);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
