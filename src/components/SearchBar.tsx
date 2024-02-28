import { FC, FormEvent, useState } from "react";
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(".search-input") as HTMLInputElement;
    setInput(input.value);
    fetchData(ResourcesType.Planets, input.value);
  };

  return (
    <form className="search-form">
      <input
        className="search-input"
        placeholder="Type to search..."
        onSubmit={(e) => handleSubmit(e)}
      />
      <button>
        <FaSearch id="search-icon" />
      </button>
    </form>
  );
};
