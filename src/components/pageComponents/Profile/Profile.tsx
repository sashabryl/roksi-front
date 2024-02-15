import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Profile.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import classNames from "classnames";
import { addRegistrationAction } from "../../../app/slice/RegistrSlice";
import { LogOut } from "../../../api";

export const Profile = () => {
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    LogOut(registrationReducer.registration.access || registrationReducer.registration.refresh);
    dispatch(addRegistrationAction({
      access: '',
      refresh: '',
    }));

    setIsSelect(false);
  };

  return (
    <div className="profile__cont">
    <div 
      className="profile__languageContainer"
      onClick={() => setIsSelect(!isSelect)}
    >
    <div className={classNames("profile__profile profile__img", {
        'profile__img2': registrationReducer.registration.access || registrationReducer.registration.refresh,
      })}/>
  </div>

  {isSelect &&(
    <div className="profile__list">
      <div className="profile__top">
        <button 
          className="filter__cross"
          onClick={() => setIsSelect(!isSelect)}
        />
      </div>

      <ul className="profile__listContainer">
        <li className="profile__select"> 
        <NavLink to="/singUp" className="profile__option">
          <p className="profile__img profile__sing"/>
          <div className="profile__text">
          {languageReducer.language 
            ?('Sing up')
            :('Peєcтpaцiя')
          }
          </div>
        </NavLink>
        </li>
        <li className="profile__select">
          <NavLink to="/logIn" className="profile__option profile__option--noBorder">
            <p className="profile__img profile__logIn"/>
            <div className="profile__text">
              {languageReducer.language 
                ?('Log in')
                :('Увійти')
              }
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
   )}

   {isSelect && (registrationReducer.registration.access || registrationReducer.registration.refresh) &&(
      <div className="profile__list">
        <div className="profile__top">
          <button 
            className="filter__cross"
            onClick={() => setIsSelect(!isSelect)}
          />
        </div>
  
        <ul className="profile__listContainer">
          <li className="profile__select"> 
          <NavLink to="/profile" className="profile__option">
            <p className="profile__img profile__sing"/>
            <div className="profile__text">
            {languageReducer.language 
              ?('Profile')
              :('Профіль')
            }
            </div>
          </NavLink>
          </li>
          {/* <li className="profile__select">
            <NavLink to="/payment" className="profile__option">
              <p className="profile__img profile__pay"/>
              <div className="profile__text">
                {languageReducer.language 
                  ?('Payment')
                  :('Платіж')
                }
              </div>
            </NavLink>
          </li> */}

          <li className="profile__select">
            <NavLink to="/history" className="profile__option">
              <p className="profile__img profile__history"/>
              <div className="profile__text">
                {languageReducer.language 
                  ?('Reservations history')
                  :('Історія бронювання')
                }
              </div>
            </NavLink>
          </li>

          
          <li className="profile__select" onClick={handleLogOut}>
            <div className="profile__option profile__option--noBorder">
              <p className="profile__img profile__logIn"/>
              <div className="profile__text">
                {languageReducer.language 
                  ?('Sing out')
                  :('Вийти')
                }
              </div>
            </div>
          </li>
        </ul>
      </div>
   )}
  </div>
  );
}