import "./SearchResult.css";
import { IFilm, ResEntity } from "../types/data";

const SearchResult = (props: {item: ResEntity}) => {
  const { item } = props;

  const isFilm = (value: ResEntity): value is IFilm => {
    return 'title' in value;
  };

  return (
    <div className="search-result">
      <div className="title"> {isFilm(item) ? item.title : item.name} </div>
      <ul className="properties">

      </ul>
    </div>
  );
};

export default SearchResult;
