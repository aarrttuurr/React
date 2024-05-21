import React, { FC, useEffect, useState } from "react";
import { ApiData, PaginationMove } from "../types/data";

interface PaginationProps {
  data: ApiData;
  /* page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageQty: React.Dispatch<React.SetStateAction<number>>; */
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
  pageQty: React.Dispatch<>
}

const SearchResultPagination: FC<PaginationProps> = ({ data, setFound}) => {
  const [page, setPage] = useState(1);
  const [pgnCurrMove, setPgnCurrMove] = useState<PaginationMove>();
  //const [pageQty, setPageQty] = useState(Math.ceil(data.count / 10));

  const pageQuery = async (url: string): Promise<ApiData> => {
    const result = await fetch(url);
    return await result.json();
  };

  useEffect(() => {
    (async () => {
      const query = (pgnCurrMove === "next") ? data.next : data.previous;
      const response = await pageQuery(query);
      setFound(response);
      console.log(response);
    })();
  }, [page]);

  const handleNextPageClick = () => {
    if(data.next) {
      setPage(page + 1);
      setPgnCurrMove(PaginationMove.Next);
    }; 
  };

  const handlePrevPageClick = () => {
    if(data.previous) {
      setPage(page - 1);
      setPgnCurrMove(PaginationMove.Prev);
    } 
  };

  return (
    <div className="search-pagination">
      <button className="search-prev-btn" onClick={() => handlePrevPageClick()}>
        {"<"}
      </button>

      <button className="search-next-btn" onClick={() => handleNextPageClick()}>
        {">"}
      </button>
    </div>
  );
};

export default SearchResultPagination;
