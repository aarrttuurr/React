import { ApiData } from "../types/data";
import SearchResult from "./SearchResult";

const SearchResultsList = (props: { data: ApiData }) => {
  const { data } = props;
  return (
    <div className="results-list">
      {data.results.map((result, id) => {
        return <SearchResult item={result} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
