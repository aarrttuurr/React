import { FC } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar: FC = () => {
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input placeholder="Type to search..." />
    </div>
  );
};
