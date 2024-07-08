import { FC, useState, Component } from "react";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultList";
import SearchResultPagination from "../components/SearchResultPagination";
import SearchSwitch from "../components/SearchSwitch";
import { ApiData, ResourcesType } from "../types/data";

type HomeState = {
  resp: ApiData;
  search: string;
  page: number;
  pageQty: number;
  searchEntity: ResourcesType;
}

class Home2 extends Component<{}, HomeState> {
  state: HomeState = {
    resp: {
      count: 0,
      next: "",
      previous: "",
      results: [],
    },
    search: "",
    page: 1,
    pageQty: 0,
    searchEntity: ResourcesType.IFilm,
  }

  setSearch(value: string) {
    this.setState({search: value});
  }

  render() {
    return (
      <div className="app">
        <div className="search-bar-container">
          <SearchBar
            search={this.state.search}
            searchEntity={this.state.searchEntity}
            setSearch={this.setSearch}
            setFound={setResp}
            setPageQty={setPageQty}
            setPage={setPage}
            page={this.state.page}
          />
          <SearchSwitch searchEntity={this.state.searchEntity} setSearchEntity={setSearchEntity} setPage={setPage} />
          {this.state.resp && this.state.resp.results.length > 0 && <SearchResultsList data={this.state.resp.results} />}
          <SearchResultPagination
            page={this.state.page}
            setPage={setPage}
            data={this.state.resp}
            setFound={setResp}
            pageQty={this.state.pageQty}
            search={this.state.search}
            searchEntity={this.state.searchEntity}
          />
        </div>
      </div>
    );
  }
}

const Home: FC = () => {
  const [resp, setResp] = useState<ApiData>({
    count: 0,
    next: "",
    previous: "",
    results: [],
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [searchEntity, setSearchEntity] = useState<ResourcesType>(ResourcesType.IFilm);

  return (
    <div className="app">
      <div className="search-bar-container">
        <SearchBar
          search={search}
          searchEntity={searchEntity}
          setSearch={setSearch}
          setFound={setResp}
          setPageQty={setPageQty}
          setPage={setPage}
          page={page}
        />
        <SearchSwitch searchEntity={searchEntity} setSearchEntity={setSearchEntity} setPage={setPage} />
        {resp && resp.results.length > 0 && <SearchResultsList data={resp.results} />}
        <SearchResultPagination
          page={page}
          setPage={setPage}
          data={resp}
          setFound={setResp}
          pageQty={pageQty}
          search={search}
          searchEntity={searchEntity}
        />
      </div>
    </div>
  );
};

export default Home;
