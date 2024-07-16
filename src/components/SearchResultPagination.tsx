import React, { FC } from "react";
import { ApiData, ResourcesType } from "../types/data";
import "./SearchResultPagination.css";

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ApiData;
  search: string;
  searchEntity: ResourcesType;
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
  pageQty: number;
};

const SearchResultPagination: FC<PaginationProps> = ({ page, setPage, data, pageQty }) => {
  const handleNextPageClick = () => {
    if (data.next) {
      setPage(page + 1);
    }
  };

  const handlePrevPageClick = () => {
    if (data.previous) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= pageQty && pageNumber !== page) {
      setPage(pageNumber);
    }
  };

  return (
    <div className="search-pagination">
      <button className="search-prev-btn" onClick={() => handlePrevPageClick()}>
        {"⬅"}
      </button>
      {[...Array(pageQty)].map((_, i) => (
        <button
          className={`search-pgnum-btn ${page === i + 1 ? "selected" : ""}`}
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button className="search-next-btn" onClick={() => handleNextPageClick()}>
        {"➡"}
      </button>
    </div>
  );
};

export default SearchResultPagination;
