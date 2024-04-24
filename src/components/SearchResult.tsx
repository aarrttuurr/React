import "./SearchResult.css";
import { useState, useEffect } from "react";
import { ApiData, IFilm, IPeople, IPlanet, ISpecie, ResEntity, IStarship } from "../types/data";

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

  const isStarship = (value: ResEntity): value is IStarship => {
    return "model" in value;
  };

  /*const isVehicle = (value: ResEntity): value is IVehicle => {
    return "model" in value;
  }; */

  const [nestedProp, setNestedProp] = useState<ResEntity[][]>([]);

  async function getItems<T>(url: string): Promise<T> {
    const result = await fetch(url);
    return await result.json();
  }

  useEffect(() => {
    (async () => {
      if (isFilm(item)) {
        const respArrPeople = await Promise.all(
          (item.characters as string[]).map(async (url) => {
            const resp = await getItems<IPeople>(url);
            return resp;
          })
        );
        const respArrStarships = await Promise.all(
          (item.starships as string[]).map(async (url) => {
            const resp = await getItems<IStarship>(url);
            return resp;
          })
        );
        setNestedProp([respArrPeople, respArrStarships]);
      }
      if (isPeople(item)) {
        const respArrPeople = await Promise.all(
          (item.characters as string[]).map(async (url) => {
            const resp = await getItems<IPeople>(url);
            return resp;
          })
        );
      }
    })();
  }, [nestedProp]);

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
          {isFilm(item) && nestedProp[0].map(person => isPeople(person) && person.name).slice(0, 5).join(", ")}
        </li>
        <li className="perk">
          {isFilm(item) && nestedProp[1].map(ship => isStarship(ship) && ship.name).slice(0, 5).join(", ")}
        </li>
      </ul>
    </div>
  );
};

export default SearchResult;
