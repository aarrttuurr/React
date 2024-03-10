import { FC, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ApiData } from "../types/data";

const Home: FC = () => {
  const [found, setFound] = useState<ApiData[]>([]);

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar setFound={setFound} />
        <div>SearchResults</div>
      </div>
    </div>
  );
};

export default Home;
