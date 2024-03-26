import { FC, FormEvent, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { ApiData, ResourcesType } from "../types/data";

interface SetFoundProps {
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
}

const SearchBar: FC<SetFoundProps> = ({ setFound }) => {
  // const [found, setFound] = useState<ApiResData>();
  const [search, setSearch] = useState("");

  const searchForItems = async (type: ResourcesType, value: string): Promise<ApiData> => {
    const result = await fetch(`https://swapi.py4e.com/api/${type}/?search=${value}`);
    return await result.json();
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(search);
      const response = await searchForItems(ResourcesType.Planets, query);
      setFound(response);
      console.log(response);
    })();
  }, [search]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(".search-input") as HTMLInputElement;
    setSearch(input.value);
    input.value = "";
  };

  return (
    <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
      <input className="search-input" placeholder="Type to search..." />
      <button>
        <FaSearch id="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
