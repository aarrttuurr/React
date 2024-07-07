import React, { Component } from "react";
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

class SearchResultPagination extends Component<PaginationProps> {
  handleNextPageClick() {
    if (this.props.data.next) {
      this.props.setPage(this.props.page + 1);
    }
  }

  handlePrevPageClick() {
    if (this.props.data.previous) {
      this.props.setPage(this.props.page - 1);
    }
  }

  handlePageChange(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.props.pageQty && pageNumber !== this.props.page) {
      this.props.setPage(pageNumber);
    }
  }

  render() {
    return (
      <div className="search-pagination">
        <button className="search-prev-btn" onClick={() => this.handlePrevPageClick()}>
          {"⬅"}
        </button>
        {[...Array(this.props.pageQty)].map((_, i) => (
          <button
            className={`search-pgnum-btn ${this.props.page === i + 1 ? "selected" : ""}`}
            key={i + 1}
            onClick={() => this.handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className="search-next-btn" onClick={() => this.handleNextPageClick()}>
          {"➡"}
        </button>
      </div>
    );
  }
}

/* const SearchResultPagination: FC<PaginationProps> = ({ page, setPage, data, pageQty }) => {
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
}; */

export default SearchResultPagination;
