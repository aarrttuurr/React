import { FC, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultList";
import SearchResultPagination from "../components/SearchResultPagination";
import { ApiData, ResourcesType } from "../types/data";

const Home: FC = () => {
  const [resp, setResp] = useState<ApiData>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const [search, setSearch] = useState("");
  const [pageQty, setPageQty] = useState(0);
  const [searchEntity, setSearchEntity] = useState<ResourcesType>(ResourcesType.IFilm);

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar
          search={search}
          searchEntity={searchEntity}
          setSearch={setSearch}
          setFound={setResp}
          setPageQty={setPageQty}
        />
        {resp && resp.results.length > 0 && <SearchResultsList data={resp.results} />}
        <SearchResultPagination data={resp} setFound={setResp} pageQty={pageQty} search={search} />
      </div>
    </div>
  );
};

export default Home;
