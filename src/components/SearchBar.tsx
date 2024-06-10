import { FC, FormEvent, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import "../App.css";
import { ApiData, ResourcesType } from "../types/data";

interface SetFoundProps {
  search: string;
  searchEntity: ResourcesType;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
  setPageQty: React.Dispatch<React.SetStateAction<number>>;
  pageQty: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

const SearchBar: FC<SetFoundProps> = ({
  search,
  searchEntity,
  setSearch,
  setFound,
  setPageQty,
  pageQty,
  setPage,
  page,
}) => {
  const searchForItems = async (value: string, withPage?: boolean): Promise<ApiData> => {
    const result = await fetch(
      withPage
        ? `https://swapi.py4e.com/api/${searchEntity}/?search=${value}&page=${page}`
        : `https://swapi.py4e.com/api/${searchEntity}/?search=${value}`
    );
    return await result.json();
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(search);
      const response = await searchForItems(query);
      setPageQty(Math.ceil(response.count / 10));
      setFound(response);
      //setPage(1);
      console.log("resp from searchbar: ", response);
      console.log("pageQty from searchbar: ", pageQty);
      console.log("page from searchbar: ", page);
    })();
  }, [search]);

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(search);
      const response = await searchForItems(query, true);
      setPageQty(Math.ceil(response.count / 10));
      setFound(response);
    })();
  }, [setPage, page, searchEntity]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(".search-input") as HTMLInputElement;
    setSearch(input.value);
    // input.value = "";
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
