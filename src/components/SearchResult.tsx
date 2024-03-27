import "./SearchResult.css";
import { IFilm, IPeople, IPlanet, ISpecie, IStarship, IVehicle } from "../types/data";

const SearchResult = (props: {
  item: IFilm | IPeople | IPlanet | ISpecie | IStarship | IVehicle;
}) => {
  const { item } = props;

  const isFilm = (
    value: IFilm | IPeople | IPlanet | ISpecie | IStarship | IVehicle
  ): value is IFilm => !!value?.url;

  return (
    <div className="search-result">
      <div className="title">{isFilm(item) ? item.title : item.name}</div>
    </div>
  );
};

export default SearchResult;
