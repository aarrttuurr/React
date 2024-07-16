import { FC, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultList";
import SearchResultPagination from "../components/SearchResultPagination";
import SearchSwitch from "../components/SearchSwitch";
import { ApiData, ResourcesType } from "../types/data";
import SearchLoader from "../components/SearchLoader";

const Home: FC = () => {
  const [resp, setResp] = useState<ApiData>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const [search, setSearch] = useState(
    localStorage.getItem("search-term") !== null ? (localStorage.getItem("search-term") as string) : ""
  );
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [searchEntity, setSearchEntity] = useState<ResourcesType>(
    localStorage.getItem("search-group") !== null
      ? (localStorage.getItem("search-group") as ResourcesType)
      : ResourcesType.IFilm
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar
          search={search}
          searchEntity={searchEntity}
          setSearch={setSearch}
          setFound={setResp}
          setPageQty={setPageQty}
          setPage={setPage}
          page={page}
          setIsLoading={setIsLoading}
        />
        <SearchSwitch searchEntity={searchEntity} setSearchEntity={setSearchEntity} setPage={setPage} />
        {/*resp && resp.count > 0 && !isLoading ? <SearchResultsList data={resp.results} /> : <SearchLoader />*/}
        {!isLoading ? (
          resp && resp.count > 0 ? (
            <SearchResultsList data={resp.results} />
          ) : (
            <p>no results found(</p>
          )
        ) : (
          <SearchLoader />
        )}
        <SearchResultPagination
          page={page}
          setPage={setPage}
          data={resp}
          setFound={setResp}
          pageQty={pageQty}
          search={search}
          searchEntity={searchEntity}
        />
      </div>
    </div>
  );
};

export default Home;
