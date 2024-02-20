import { useEffect, useState } from "react";
import "./Select.scss";
import Checkbox from '@mui/material/Checkbox';
import { Option } from "../../../helpers/Options";
import { getOptions } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../../helpers/helpers";
import classNames from "classnames";


export const Select = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [option, setOption] = useState<Option[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [searchQuery, setSearchQuery] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const languageReducer = useAppSelector(state => state.language);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    getOptions()
      .then((straviFromServer) => {
        setOption(straviFromServer);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCheckboxChange = (subcategoryNameEng: string) => {
    const updatedOptions = selectedOptions.includes(subcategoryNameEng)
      ? selectedOptions.filter((option) => option !== subcategoryNameEng)
      : [...selectedOptions, subcategoryNameEng];

    setSelectedOptions(updatedOptions);
  };

  const submitForm = () => {
    const searchParams = new URLSearchParams();
    selectedOptions.forEach((option) => {
      searchParams.append('selectedOptions', option);
    });
  
    const queryString = searchParams.toString();
  
    setSearchQuery(getSearchWith(searchQuery, { tupe: queryString || null }));
    setIsSelect(!isSelect);
    setSelectedOption(null);
  };

  const isClearSearch = () => {
    setIsSelect(!isSelect);
    setSearchQuery(getSearchWith(searchQuery, { tupe: null }));
    setSelectedOptions([]);
    setSelectedOption(null);
  }

  const [openSubcategories, setOpenSubcategories] = useState<number[]>([]);

  const handleSelectClick = (selected: Option) => {
    setSelectedOption(selected);

    const isOpen = openSubcategories.includes(selected.id);

    setOpenSubcategories((prev) =>
      isOpen ? prev.filter((id) => id !== selected.id) : [...prev, selected.id]
    );

    if (selected === selectedOption && isOpen) {
      setSelectedOption(null);
    }
  };

  return (
    <div className="select">
        <button 
          className={classNames("select__container", 
          isSelect && 'select__container--selected')}
          onClick={() => handleSelectClick}
        >
          {languageReducer.language 
             ?('Glasses')
             :('Скляні вироби')
           }
        </button>

        <button 
          className={classNames("select__container", 
          isSelect && 'select__container--selected')}
          onClick={() => handleSelectClick}
        >
          {languageReducer.language 
             ?('Pictures')
             :('Картини')
           }
        </button>

        <button 
          className={classNames("select__container", 
          isSelect && 'select__container--selected')}
          onClick={() => handleSelectClick}
        >
          {languageReducer.language 
             ?('Christmas bubbles')
             :('Різдвяні кульки')
           }
        </button>
    </div>
  );
};