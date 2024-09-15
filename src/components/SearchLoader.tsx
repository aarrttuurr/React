import { FC } from "react";
import "./SearchLoader.css";

const SearchLoader: FC = () => {
  return (
    <div className="search-spinner-wrapper">
      <span className="search-spinner"></span>
    </div>
  );
};

export default SearchLoader;
