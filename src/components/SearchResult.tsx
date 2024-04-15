import "./SearchResult.css";
import { ApiData, IFilm, IPeople, IPlanet, ISpecie, ResEntity } from "../types/data";

async function getItems<T>(url: string): Promise<T> {
  const result = await fetch(url);
  return await result.json();
};

const SearchResult = (props: { item: ResEntity }) => {
  const { item } = props;

  const isFilm = (value: ResEntity): value is IFilm => {
    return "title" in value;
  };

  /* function isFilm<T extends IFilm>(value: T) {
    return "title" in value;
  }; */

  const isPeople = (value: ResEntity): value is IPeople => {
    return "birth_year" in value;
  };

  const isPlanet = (value: ResEntity): value is IPlanet => {
    return "orbital_period" in value;
  };

  const isSpecie = (value: ResEntity): value is ISpecie => {
    return "classification" in value;
  };

  /* const isStarship = (value: ResEntity): value is IStarship => {
    return "model" in value;
  };

  const isVehicle = (value: ResEntity): value is IVehicle => {
    return "model" in value;
  }; */

  return (
    <div className="search-result">
      <div className="result-title"> {isFilm(item) ? item.title : item.name} </div>
      <ul className="result-perks">
        <li className="perk">
          {isFilm(item)
            ? item.episode_id
            : isPeople(item)
              ? item.gender
              : isPlanet(item)
                ? item.climate
                : isSpecie(item)
                  ? item.classification
                  : item.manufacturer}
        </li>
        <li className="perk">
          {isFilm(item)
            ? item.release_date.toString()
            : isPeople(item)
              ? item.birth_year
              : isPlanet(item)
                ? item.population
                : isSpecie(item)
                  ? item.average_lifespan
                  : item.model}
        </li>
        <li className="perk">
          {isFilm(item)
            ? item.director
            : isPeople(item)
              ? item.height
              : isPlanet(item)
                ? item.population
                : isSpecie(item)
                  ? item.average_height
                  : item.passengers}
        </li>
        <li className="perk">
          {isFilm(item) && item.characters.map((link) => {
            if (typeof link === "string") {
              const nestResp = await getItems<IPeople>(link);
            }
          }).join(', ')}
        </li>
      </ul>
    </div>
  );
};

export default SearchResult;
