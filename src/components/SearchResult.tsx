import "./SearchResult.css";
import { IFilm, IPeople, IPlanet, ISpecie, IStarship, IVehicle } from "../types/data";

const SearchResult = (props: {
  item: IFilm | IPeople | IPlanet | ISpecie | IStarship | IVehicle;
}) => {
  const { item } = props;
  return (
    <div className="search-result">
      <div className="title">{item.url}</div>
    </div>
  );
};

export default SearchResult;
