import "./SearchResult.css";
import { useState, useLayoutEffect } from "react";
import { IFilm, IPeople, IPlanet, ISpecie, ResEntity, IStarship, IVehicle } from "../types/data";

const SearchResult = (props: { item: ResEntity }) => {
  const { item } = props;

  const isFilm = (value: ResEntity): value is IFilm => "title" in value;

  const isPeople = (value: ResEntity): value is IPeople => "birth_year" in value;

  const isPlanet = (value: ResEntity): value is IPlanet => "orbital_period" in value;

  const isSpecie = (value: ResEntity): value is ISpecie => "classification" in value;

  const isStarship = (value: ResEntity): value is IStarship => "model" in value;

  const isVehicle = (value: ResEntity): value is IVehicle => "model" in value;

  const [nestedProp, setNestedProp] = useState<ResEntity[][]>([]);

  async function getItems<T>(url: string): Promise<T> {
    const result = await fetch(url);
    return await result.json();
  }

  async function getItemsArray<TObj, TResp>(obj: TObj, key: keyof TObj) {
    return await Promise.all(
      (obj[key] as string[]).map(async (url) => {
        const resp = await getItems<TResp>(url);
        return resp;
      })
    );
  }

  useLayoutEffect(() => {
    (async () => {
      if (isFilm(item)) {
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "characters");
        const respArrStarships = await getItemsArray<typeof item, IStarship>(item, "starships");
        const respArrVehicles = await getItemsArray<typeof item, IVehicle>(item, "vehicles");
        setNestedProp([respArrPeople, respArrStarships, respArrVehicles]);
      }
      if (isPeople(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrSpecies = await getItemsArray<typeof item, ISpecie>(item, "species");
        const respArrVehicles = await getItemsArray<typeof item, IVehicle>(item, "vehicles");
        setNestedProp([respArrFilms, respArrSpecies, respArrVehicles]);
      }
      if (isPlanet(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrResidents = await getItemsArray<typeof item, IPeople>(item, "residents");
        setNestedProp([respArrFilms, respArrResidents]);
      }
      if (isSpecie(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "people");
        const respArrHomeworld = await getItemsArray<typeof item, IPlanet>(item, "homeworld");
        setNestedProp([respArrFilms, respArrPeople, respArrHomeworld]);
      }
      if (isStarship(item) || isVehicle(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "pilots");
        setNestedProp([respArrFilms, respArrPeople]);
      }
    })();
  }, [nestedProp]);

  return (
    <div className="search-result">
      <div className="result-title"> {isFilm(item) ? item.title : item.name} </div>
      <ul className="result-perks">
        <li className="perk">
          {isFilm(item)
            ? "Episode: " + item.episode_id
            : isPeople(item)
              ? "Gender: " + item.gender
              : isPlanet(item)
                ? "Climate: " + item.climate
                : isSpecie(item)
                  ? "Class: " + item.classification
                  : "Producer: " + item.manufacturer}
        </li>
        <li className="perk">
          {isFilm(item)
            ? "Release date: " + item.release_date.toString()
            : isPeople(item)
              ? "Birth: " + item.birth_year
              : isPlanet(item)
                ? "Birth: " + item.population
                : isSpecie(item)
                  ? "~Lifespan: " + item.average_lifespan
                  : "Model: " + item.model}
        </li>
        <li className="perk">
          {isFilm(item)
            ? "Director: " + item.director
            : isPeople(item)
              ? "Height: " + item.height
              : isPlanet(item)
                ? "Height: " + item.population
                : isSpecie(item)
                  ? "~Height: " + item.average_height
                  : "Passengers: " + item.passengers}
        </li>
        {nestedProp.map(nestedPropItem => {
          return (nestedPropItem.length > 0) && 
            <li className="perk">
              {nestedPropItem
                .map((elObj) => isFilm(elObj) ? elObj.title : elObj.name)
                .slice(0, 5)
                .join(", ")}
            </li>
        })}
        {/* <li className="perk">
          {nestedProp[0]
            ?.map((elObj) => isFilm(elObj) ? elObj.title : elObj.name)
            .slice(0, 5)
            .join(", ")}
        </li>
        <li className="perk">
          {nestedProp[1]
            ?.map((elObj) => isFilm(elObj) ? elObj.title : elObj.name)
            .slice(0, 5)
            .join(", ")}
        </li>
        <li className="perk">
          {nestedProp[2]
            ?.map((elObj) => isFilm(elObj) ? elObj.title : elObj.name)
            .slice(0, 5)
            .join(", ")}
        </li> */}
      </ul>
    </div>
  );
};

export default SearchResult;
