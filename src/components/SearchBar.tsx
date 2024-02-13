import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar: FC = () => {
  const [input, setInput] = useState("");

  const fetchData = (value: string) => {
    fetch("https://swapi.dev/api/vehicles")
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
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
