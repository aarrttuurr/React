import React, { FC } from "react";
import { ResourcesType } from "../types/data";

interface SwitchProps {
  setSearchEntity: React.Dispatch<React.SetStateAction<ResourcesType>>;
}

const SearchSwitch: FC<SwitchProps> = ({ setSearchEntity }) => {
  return (
    <fieldset>
      <legend>What are you looking for?</legend>
      <div>
        {}
      </div>
    </fieldset>
  );
}

export default SearchSwitch;
