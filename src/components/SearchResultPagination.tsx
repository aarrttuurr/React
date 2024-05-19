import { useState } from "react";
import { ApiData } from "../types/data";

const SearchResultPagination = (props: { data: ApiData }) => {
  const { data } = props;

  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);

  const pageQuery = async (url: string): Promise<ApiData> => {
    const result = await fetch(url);
    return await result.json();
  };

  const handleNextPageClick = () => {
    //data.next &&
  };

  const handlePrevPageClick = () => {};

  return (
    <div className="search-pagination">
      <button className="search-prev-btn" onClick={handlePrevPageClick}>
        {"<"}
      </button>
      <button className="search-next-btn" onClick={handleNextPageClick}>
        {">"}
      </button>
    </div>
  );
};

export default SearchResultPagination;
