import { Component, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import "../App.css";
import { ApiData, ResourcesType } from "../types/data";

type SetFoundProps = {
  search: string;
  searchEntity: ResourcesType;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setFound: React.Dispatch<React.SetStateAction<ApiData>>;
  setPageQty: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
};

class SearchBar extends Component<SetFoundProps> {
  async searchForItems(value: string, withPage?: boolean): Promise<ApiData> {
    const result = await fetch(
      withPage
        ? `https://swapi.py4e.com/api/${this.props.searchEntity}/?search=${value}&page=${this.props.page}`
        : `https://swapi.py4e.com/api/${this.props.searchEntity}/?search=${value}`
    );
    return await result.json();
  }

  async searchRequester(pages?: boolean) {
    const query = encodeURIComponent(this.props.search);
    const response = pages ? await this.searchForItems(query, true) : await this.searchForItems(query);
    this.props.setPageQty(Math.ceil(response.count / 10));
    this.props.setFound(response);
  }

  componentDidMount(): void {
    this.searchRequester();
  }

  componentDidUpdate(prevProps: Readonly<SetFoundProps>): void {
    if (
      this.props.page !== prevProps.page ||
      this.props.searchEntity !== prevProps.searchEntity ||
      this.props.setPage !== prevProps.setPage
    ) {
      this.searchRequester(true);
    }

    if (this.props.search !== prevProps.search) {
      this.searchRequester();
    }
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(".search-input") as HTMLInputElement;
    this.props.setSearch(input.value);
  }

  render() {
    return (
      <form className="search-form" onSubmit={(e) => this.handleSubmit(e)}>
        <input className="search-input" placeholder="Type to search..." />
        <button>
          <FaSearch id="search-icon" />
        </button>
      </form>
    );
  }
}

/* const SearchBar: FC<SetFoundProps> = ({ search, searchEntity, setSearch, setFound, setPageQty, setPage, page }) => {
  const searchForItems = async (value: string, withPage?: boolean): Promise<ApiData> => {
    const result = await fetch(
      withPage
        ? `https://swapi.py4e.com/api/${searchEntity}/?search=${value}&page=${page}`
        : `https://swapi.py4e.com/api/${searchEntity}/?search=${value}`
    );
    return await result.json();
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(search);
      const response = await searchForItems(query);
      setPageQty(Math.ceil(response.count / 10));
      setFound(response);
    })();
  }, [search]);

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(search);
      const response = await searchForItems(query, true);
      setPageQty(Math.ceil(response.count / 10));
      setFound(response);
    })();
  }, [setPage, page, searchEntity]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(".search-input") as HTMLInputElement;
    setSearch(input.value);
  };

  return (
    <form className="search-form" onSubmit={(e) => handleSubmit(e)}>
      <input className="search-input" placeholder="Type to search..." />
      <button>
        <FaSearch id="search-icon" />
      </button>
    </form>
  );
}; */

export default SearchBar;
