import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { changeLanguageAction } from "../../../app/slice/LanguageSlice";
import { useLocation } from "react-router";
import classNames from "classnames";

export const LanguageChange = () => {
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useAppDispatch();
  const isHomePage = useLocation().pathname === '/';

  const languageReducer = useAppSelector(state => state.language);

  const handleLanguageChange = (isEnglish: boolean) => {
    dispatch(changeLanguageAction(isEnglish));
    setIsSelect(prevState => !prevState);
  };

  return (
    <div className="header__cont">
      <div 
      className={classNames(
        'header__languageContainer',  
        { 'header__languageContainer--2': isHomePage }
      )}
      
      onClick={() => setIsSelect(!isSelect)}
    >
      <div className="header__languages header__img"/>
      <div className="header__languages--select">
        {languageReducer.language ?(
          <div className="header__languages--text">En</div>
        )
        :(
          <div className="header__languages--text">Ua</div>
        )}
        <button className="header__languages--button header__img"/>
      </div>
    </div>

    {isSelect &&(
      <ul className="header__list">
        {languageReducer.language ?(
            <li 
            className="header__select"
            onClick={() => handleLanguageChange(false)}
          > Українська
          </li>
        )
        :(
          <li 
          className="header__select"
          onClick={() => handleLanguageChange(true)}
        > English
        </li>
        
        )}
      </ul>
      )}
    </div>
  );
}