import React, { FC, ChangeEvent } from "react";
import { ResourcesType } from "../types/data";

interface SwitchProps {
  searchEntity: ResourcesType;
  setSearchEntity: React.Dispatch<React.SetStateAction<ResourcesType>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchSwitch: FC<SwitchProps> = ({ searchEntity, setSearchEntity, setPage }) => {
  const changeSelection = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchEntity(e.target.value as ResourcesType);
    setPage(1);
  };

  function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => !Number.isNaN(k)) as K[];
  }

  return (
    <fieldset>
      <legend>What are you looking for?</legend>
      <div>
        {enumKeys(ResourcesType).map((key, i) => {
          return (
            <>
              <label htmlFor={`entity${i + 1}`}>{ResourcesType[key]}</label>
              <input
                type="radio"
                id={`entity${i + 1}`}
                name="entity"
                key={i + 1}
                value={ResourcesType[key]}
                onChange={(e) => changeSelection(e)}
                checked={searchEntity === ResourcesType[key]}
              />
            </>
          );
        })}
      </div>
    </fieldset>
  );
};

export default SearchSwitch;
