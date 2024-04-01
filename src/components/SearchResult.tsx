import "./SearchResult.css";
import { IFilm, IPeople, IPlanet, ISpecie, IStarship, IVehicle, ResEntity } from "../types/data";

const SearchResult = (props: { item: ResEntity }) => {
  const { item } = props;

  const isFilm = (value: ResEntity): value is IFilm => {
    return "title" in value;
  };

  const isPeople = (value: ResEntity): value is IPeople => {
    return "birth_year" in value;
  };

  const isPlanet = (value: ResEntity): value is IPlanet => {
    return "orbital_period" in value;
  };

  const isSpecie = (value: ResEntity): value is ISpecie => {
    return "classification" in value;
  };

  const isStarship = (value: ResEntity): value is IStarship => {
    return "model" in value;
  };

  const isVehicle = (value: ResEntity): value is IVehicle => {
    return "model" in value;
  };

  return (
    <div className="search-result">
      <div className="result-title"> {isFilm(item) ? item.title : item.name} </div>
      <ul className="result-perks">
        <li className="perk">
          {isFilm(item) ? item.director : 
            isPeople(item) ? item.birth_year :
            isPlanet(item) ? item.diameter :
            isSpecie(item) ? item.classification : item.model}
        </li>
        <li className="perk">
          {isFilm(item) ? item.director : 
              isPeople(item) ? item.birth_year :
              isPlanet(item) ? item.diameter :
              isSpecie(item) ? item.classification : item.model}
        </li>
      </ul>
    </div>
  );
};

export default SearchResult;
