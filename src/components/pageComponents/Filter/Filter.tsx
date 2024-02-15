import { useState } from "react";

import "./Filter.scss";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../../helpers/helpers";

export const Filter = () => {
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState('');

  const handleCheckboxChange = (value: string) => {
    setSelectedOption(value === selectedOption ? '' : value);
  };

  const submitForm = () => {
    setSearchQuery(getSearchWith(searchQuery, { filter: selectedOption || null }));
    setIsSelect(!isSelect);
  };

  const isClearSearch = () => {
    setSelectedOption('');
    setSearchQuery(getSearchWith(searchQuery, { filter: null }));
    setIsSelect(!isSelect);
  }

  return (
    <div className="filter">
      <button 
        className="filter__img--container"
        onClick={() => setIsSelect(!isSelect)}
      >
        <p className="filter__img"/>
      </button>

 
    {isSelect &&(
      <div className="filter__container">
        <div className="filter__top">
          <h1 className="filter__header">
          {languageReducer.language 
              ?('Filters')
              :('Фільтри')
            }
          </h1>
          <button 
            className="filter__cross"
            onClick={isClearSearch}
          />
        </div>
        <form className="filter__form">
          <label className="filter__label">
            <input 
              type="radio"
              className="filter__radio" 
              value='random'
              checked={selectedOption === 'random'}
              onChange={() => handleCheckboxChange("random")}
            />
            {languageReducer.language 
              ?('Recommended to you')
              :('Рекомендовано для вас')
            }
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="cheapest"
              className="filter__radio" 
              checked={selectedOption === 'cheapest'}
              onChange={() => handleCheckboxChange("cheapest")}
            />
            {languageReducer.language 
              ?('The cheapest')
              :('Найдешевші')
            }
          </label>

          <label className="filter__label">
            <input 
              type="radio" 
              value="expensive" 
              className="filter__radio" 
              onChange={() => handleCheckboxChange("expensive")}
              checked={selectedOption === 'expensive'}
            />
            {languageReducer.language 
              ?('The most expensive')
              :('Найдорожчі')
            }
          </label>

          {/* <label className="filter__label">
            <input 
              type="radio" 
              value="option3" 
              className="filter__radio" 
          />
            {languageReducer.language 
              ?('The newest')
              :('Найновіші')
            }
          </label> */}
        </form>

        <div className="filter__buttonContainer">
          <button 
          className="filter__button" 
          onClick={submitForm}
          >
            {languageReducer.language 
              ?('Apply')
              :('Застосувати')
            }
          </button>
          <button 
            className="filter__cancel"
            onClick={isClearSearch}
          >
            {languageReducer.language 
              ?('Cancel all')
              :('Скасувати все')
            }
          </button>
        </div>
      </div>
      )}
  </div>
  );
}