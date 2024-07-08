import { ChangeEvent, Component } from "react";
import { ResourcesType } from "../types/data";

type SwitchProps = {
  searchEntity: ResourcesType;
  setSearchEntity: (value: ResourcesType) => void;
  setPage: (value: number) => void;
};

class SearchSwitch extends Component<SwitchProps> {
  changeSelection(e: ChangeEvent<HTMLInputElement>) {
    this.props.setSearchEntity(e.target.value as ResourcesType);
    this.props.setPage(1);
  }

  enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => !Number.isNaN(k)) as K[];
  }

  render() {
    return (
      <fieldset>
        <legend>What are you looking for?</legend>
        <div>
          {this.enumKeys(ResourcesType).map((key, i) => {
            return (
              <label htmlFor={`entity${i + 1}`} className="entityInputLabel" key={`entityInpLabel${i + 1}`}>
                <input
                  type="radio"
                  className="entityInput"
                  id={`entity${i + 1}`}
                  name="entity"
                  key={`entityInp${i + 1}`}
                  value={ResourcesType[key]}
                  onChange={(e) => this.changeSelection(e)}
                  checked={this.props.searchEntity === ResourcesType[key]}
                />
                {ResourcesType[key]}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }
}

/*
type SwitchProps = {
  searchEntity: ResourcesType;
  setSearchEntity: React.Dispatch<React.SetStateAction<ResourcesType>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

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
            <label htmlFor={`entity${i + 1}`} className="entityInputLabel" key={`entityInpLabel${i + 1}`}>
              <input
                type="radio"
                className="entityInput"
                id={`entity${i + 1}`}
                name="entity"
                key={`entityInp${i + 1}`}
                value={ResourcesType[key]}
                onChange={(e) => changeSelection(e)}
                checked={searchEntity === ResourcesType[key]}
              />
              {ResourcesType[key]}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}; */

export default SearchSwitch;
