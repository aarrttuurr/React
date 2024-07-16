import { useEffect, useState } from "react";
import { IFilm, IPeople, IPlanet, ISpecie, ResEntity, IStarship, IVehicle, StateEntities } from "../types/data";
import "./SearchResult.css";

const SearchResult = (props: { item: ResEntity }) => {
  const { item } = props;

  const isFilm = (value: ResEntity): value is IFilm => "title" in value;

  const isPeople = (value: ResEntity): value is IPeople => "birth_year" in value;

  const isPlanet = (value: ResEntity): value is IPlanet => "orbital_period" in value;

  const isSpecie = (value: ResEntity): value is ISpecie => "classification" in value;

  const isStarship = (value: ResEntity): value is IStarship => "model" in value;

  const isVehicle = (value: ResEntity): value is IVehicle => "model" in value;

  const [nestedProp, setNestedProp] = useState<StateEntities>({});

  async function getItems<T>(url: string): Promise<T> {
    const result = await fetch(url);
    return await result.json();
  }

  async function getItemsArray<TObj, TResp>(obj: TObj, key: keyof TObj) {
    const result = Array.isArray(obj[key])
      ? await Promise.all((obj[key] as string[]).map(async (url) => await getItems<TResp>(url)))
      : typeof obj[key] === "string"
        ? [await getItems<TResp>(obj[key] as string)]
        : [];
    return { [key]: result };
  }

  useEffect(() => {
    (async () => {
      if (isFilm(item)) {
        const respArrPeople = await getItemsArray<typeof item, IPeople>(item, "characters");
        const respArrStarships = await getItemsArray<typeof item, IStarship>(item, "starships");
        const respArrVehicles = await getItemsArray<typeof item, IVehicle>(item, "vehicles");
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
  }, [item]);

  return (
    <div className="search-result">
      <div className="result-title"> {isFilm(item) ? item.title : item.name} </div>
      <ul className="result-perks">
        {isFilm(item) ? (
          <>
            <li className="perk">
              <b>Episode: </b>
              {item.episode_id}
            </li>
            <li className="perk">
              <b>Release date: </b>
              {item.release_date.toString()}
            </li>
            <li className="perk">
              <b>Episode: </b>
              {item.episode_id}
            </li>
          </>
        ) : isPeople(item) ? (
          <>
            <li className="perk">
              <b>Gender: </b>
              {item.gender}
            </li>
            <li className="perk">
              <b>Birth: </b>
              {item.birth_year}
            </li>
            <li className="perk">
              <b>Height: </b>
              {item.height}
            </li>
          </>
        ) : isPlanet(item) ? (
          <>
            <li className="perk">
              <b>Climate: </b>
              {item.climate}
            </li>
            <li className="perk">
              <b>Population: </b>
              {item.population}
            </li>
            <li className="perk">
              <b>Gravity: </b>
              {item.gravity}
            </li>
          </>
        ) : isSpecie(item) ? (
          <>
            <li className="perk">
              <b>Class: </b>
              {item.classification}
            </li>
            <li className="perk">
              <b>~Lifespan: </b>
              {item.average_lifespan}
            </li>
            <li className="perk">
              <b>~Height: </b>
              {item.average_height}
            </li>
          </>
        ) : (
          <>
            <li className="perk">
              <b>Producer: </b>
              {item.manufacturer}
            </li>
            <li className="perk">
              <b>Model: </b>
              {item.model}
            </li>
            <li className="perk">
              <b>Passengers: </b>
              {item.passengers}
            </li>
          </>
        )}
        {(() => {
          const arrEntityListItems = [];
          for (const key in nestedProp) {
            const entityArr = nestedProp[key as keyof StateEntities];
            entityArr &&
              entityArr.length &&
              arrEntityListItems.push(
                <li className="perk" key={key}>
                  <strong>{key}: </strong>
                  {entityArr
                    .map((elObj) => (isFilm(elObj) ? elObj.title : elObj.name))
                    .slice(0, 5)
                    .join(", ")}
                </li>
              );
          }
          return arrEntityListItems;
        })()}
      </ul>
    </div>
  );
};

export default SearchResult;
