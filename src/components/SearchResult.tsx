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

  interface StateEntities {
    films?: IFilm[];
    characters?: IPeople[];
    residents?: IPeople[];
    people?: IPeople[];
    pilots?: IPeople[];
    homeworld?: IPlanet[];
    species?: ISpecie[];
    starships?: IStarship[];
    vehicles?: IVehicle[];
  }

  const [nestedProp, setNestedProp] = useState<StateEntities>({});

  async function getItems<T>(url: string): Promise<T> {
    const result = await fetch(url);
    return await result.json();
  }

  async function getItemsArray<TObj, TResp>(obj: TObj, key: keyof TObj) {
    const resultArr = await Promise.all(
      (obj[key] as string[]).map(async (url) => {
        const resp = await getItems<TResp>(url);
        return resp;
      })
    );
    return {[key]: resultArr};
  }

  useLayoutEffect(() => {
    (async () => {
      if (isFilm(item)) {
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "characters");
        const respArrStarships = await getItemsArray<typeof item, IStarship>(item, "starships");
        const respArrVehicles = await getItemsArray<typeof item, IVehicle>(item, "vehicles");
        console.log(Object.assign(respArrPeople, respArrStarships, respArrVehicles));
        setNestedProp(Object.assign(respArrPeople, respArrStarships, respArrVehicles));
      }
      if (isPeople(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrSpecies = await getItemsArray<typeof item, ISpecie>(item, "species");
        const respArrVehicles = await getItemsArray<typeof item, IVehicle>(item, "vehicles");
        setNestedProp(Object.assign(respArrFilms, respArrSpecies, respArrVehicles));
      }
      if (isPlanet(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrResidents = await getItemsArray<typeof item, IPeople>(item, "residents");
        setNestedProp(Object.assign(respArrFilms, respArrResidents));
      }
      if (isSpecie(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "people");
        const respArrHomeworld = await getItemsArray<typeof item, IPlanet>(item, "homeworld");
        setNestedProp(Object.assign(respArrFilms, respArrPeople, respArrHomeworld));
      }
      if (isStarship(item) || isVehicle(item)) {
        const respArrFilms = await getItemsArray<typeof item, IFilm>(item, "films");
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "pilots");
        setNestedProp(Object.assign(respArrFilms, respArrPeople));
      }
    })();
  }, []);

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
        {/* nestedProp.map((nestedPropItem) => {
          return (
            nestedPropItem.length > 0 && (
              <li className="perk">
                {nestedPropItem
                  .map((elObj) => (isFilm(elObj) ? elObj.title : elObj.name))
                  .slice(0, 5)
                  .join(", ")}
              </li>
            )
          );
        }); */}
        {(() => {
          const arr = [];
          for (k in nestedProp) {
            arr.push(
              <li className="perk" key={k}>
                {nestedProp[k]
                  .map((elObj) => (isFilm(elObj) ? elObj.title : elObj.name))
                  .slice(0, 5)
                  .join(", ")}}
              </li>
            );
          }
          return arr;
        })()}
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
