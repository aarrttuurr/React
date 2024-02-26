import { FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { ApiResData, ResourcesType } from "../types/data";

export const SearchBar: FC = () => {
  const [input, setInput] = useState("");

  const fetchData = (type: ResourcesType, value: string) => {
    fetch(`https://swapi.dev/api/${type}/?search=${value}`)
      .then((resp) => resp.json())
      .then((json: ApiResData) => {
        /* const results = json.results.filter((person: ApiResData) => {
          return value && person;
        }); */
        console.log(json);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(ResourcesType.Planets, value);
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
