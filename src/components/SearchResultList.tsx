import "./SearchResultList.css";
import { Component } from "react";
import { ResEntity } from "../types/data";
import SearchResult from "./SearchResult";

class SearchResultsList extends Component<{ data: ResEntity[] }> {
  render() {
    return (
      <div className="results-list">
        {this.props.data.map((result, id) => {
          return <SearchResult item={result} key={id} />;
        })}
      </div>
    );
  }
}

/* const SearchResultsList = (props: { data: ResEntity[] }) => {
  const { data } = props;
  return (
    <div className="results-list">
      {data.map((result, id) => {
        return <SearchResult item={result} key={id} />;
      })}
    </div>
  );
}; */

export default SearchResultsList;
