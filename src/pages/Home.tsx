import { FC, useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultList";
import { ApiData } from "../types/data";

const Home: FC = () => {
  const [resp, setResp] = useState<ApiData>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar setFound={setResp} />
        {resp && resp.results.length > 0 && <SearchResultsList data={resp.results} />}
      </div>
    </div>
  );
};

export default Home;
