import React, { FC, useEffect, useState } from "react";
import { ApiData, PaginationMove, ResourcesType } from "../types/data";
import "./SearchResultPagination.css";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: ApiData;
  search: string;
  searchEntity: ResourcesType;
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
  pageQty: number;
}

const SearchResultPagination: FC<PaginationProps> = ({
  page,
  setPage,
  data,
  search,
  searchEntity,
  setFound,
  pageQty,
}) => {
  //const [page, setPage] = useState(1);
  const [pgnCurrMove, setPgnCurrMove] = useState<PaginationMove>();

  const pageQuery = async (url: string): Promise<ApiData> => {
    const result = await fetch(url);
    return await result.json();
  };

  useEffect(() => {
    (async () => {
      const query =
        pgnCurrMove === "numb"
          ? `https://swapi.py4e.com/api/${searchEntity}/?search=${search}&page=${page}`
          : pgnCurrMove === "next"
            ? data.next
            : data.previous;
      const response = await pageQuery(query);
      setFound(response);
      console.log("pageQty from pagination: ", pageQty);
      console.log("resp from pagination: ", response);
    })();
  }, [page, search, searchEntity]);

  const handleNextPageClick = () => {
    if (data.next) {
      setPage(page + 1);
      setPgnCurrMove(PaginationMove.Next);
    }
  };

  const handlePrevPageClick = () => {
    if (data.previous) {
      setPage(page - 1);
      setPgnCurrMove(PaginationMove.Prev);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= pageQty && pageNumber !== page) {
      setPage(pageNumber);
      setPgnCurrMove(PaginationMove.Numb);
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
