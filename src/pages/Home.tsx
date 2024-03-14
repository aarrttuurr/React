import { FC, useState } from "react";
import SearchBar from "../components/SearchBar";
import { ApiData } from "../types/data";

const Home: FC = () => {
  const [results, setResults] = useState<ApiData[]>([]);

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar setFound={setResults} />
        {/* {results && results.length > 0 && <SearchResultsList results={results} />} */}
      </div>
    </div>
  );
};

export default Home;
