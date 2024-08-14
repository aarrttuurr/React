import { FC, FormEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import "../App.css";
import { ApiData, ResourcesType } from "../types/data";

type SetFoundProps = {
  search: string;
  searchEntity: ResourcesType;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
  setPageQty: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar: FC<SetFoundProps> = ({
  search,
  searchEntity,
  setSearch,
  setFound,
  setPageQty,
  setPage,
  page,
  setIsLoading,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //const postQuery = searchParams.get
  const searchForItems = async (value: string, withPage?: boolean): Promise<ApiData> => {
    const result = await fetch(
      withPage
        ? `https://swapi.py4e.com/api/${searchEntity}/?search=${value}&page=${page}`
        : `https://swapi.py4e.com/api/${searchEntity}/?search=${value}`
    );
    return await result.json();
  };

  const getData = async (withPage?: boolean) => {
    setIsLoading(true);
    const query = encodeURIComponent(search);
    const response = await searchForItems(query, withPage);
    console.log(response);
    setIsLoading(false);
    setPageQty(Math.ceil(response.count / 10));
    setFound(response);
  };

  useEffect(() => {
    getData();
  }, [search]);

  useEffect(() => {
    getData(true);
  }, [setPage, page, searchEntity]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    //const input = form.querySelector(".search-input") as HTMLInputElement;
    setSearch(form.search.value);
    setSearchParams({ search: form.search.value });
    localStorage.setItem("search-term", form.search.value);
  };

  return (
    <form className="search-form" autoComplete="off" onSubmit={handleSubmit}>
      <input className="search-input" type="search" name="search" placeholder="Type to search..." defaultValue={search} />
      <button>
        <FaSearch id="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
