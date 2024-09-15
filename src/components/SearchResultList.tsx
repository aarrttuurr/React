import "./SearchResultList.css";
import { ResEntity } from "../types/data";
import SearchResult from "./SearchResult";

const SearchResultsList = (props: { data: ResEntity[] }) => {
  const { data } = props;
  return (
    <div className="results-list">
      {data.map((result, id) => {
        return <SearchResult item={result} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
