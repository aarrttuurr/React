import { FC } from "react";
import { SearchBar } from "../components/SearchBar";

const Home: FC = () => {
  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar />
        <div>SearchResults</div>
      </div>
    </div>
  );
};

export default Home;
