import React, { FC, ChangeEvent } from "react";
import { ResourcesType } from "../types/data";

interface SwitchProps {
  searchEntity: ResourcesType;
  setSearchEntity: React.Dispatch<React.SetStateAction<ResourcesType>>;
}

const SearchSwitch: FC<SwitchProps> = ({ searchEntity, setSearchEntity }) => {
  const changeSelection = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchEntity(e.target.value);
  };

  function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => !Number.isNaN(k)) as K[];
  }

  return (
    <fieldset>
      <legend>What are you looking for?</legend>
      <div>
        {enumKeys(ResourcesType).map((_key, i) => {
          return (
            <>
              <input
                type="radio"
                id="entity1"
                name="entity"
                key={i + 1}
                value={ResourcesType[_key]}
                onChange={(e) => changeSelection(e)}
                checked={searchEntity === ResourcesType[_key]}
              />
              <label htmlFor="contactChoice1">{ResourcesType[_key]}</label>
            </>
          );
        })}
      </div>
    </fieldset>
  );
};

export default SearchSwitch;
