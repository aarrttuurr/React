import { IFilm, IPeople, IPlanet, ISpecie, IStarship, IVehicle } from "../types/data";
import SearchResult from "./SearchResult";

const SearchResultsList = (props: {
  data: IFilm[] | IPeople[] | IPlanet[] | ISpecie[] | IStarship[] | IVehicle[];
}) => {
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
