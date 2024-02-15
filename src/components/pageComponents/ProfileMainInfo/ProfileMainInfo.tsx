import classNames from "classnames";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { UserType } from "../../../helpers/UserType";
import { getUser } from "../../../api";
import axios from "axios";
import region from "../../../oblasts.json";

type Props = {
  noProfile: boolean,
}

export const ProfileMainInfo:React.FC<Props> = ({noProfile}) => {
  const registrationReducer = useAppSelector(state => state.registration);
  const languageReducer = useAppSelector(state => state.language);

  const [user, setUser] = useState<UserType>();
  const [firstName, setFirstName] = useState<string | undefined>(user?.first_name || '');
  const [lastName, setLastName] = useState<string | undefined>(user?.last_name || '');
  // const [country, setCountry] = useState<string | undefined>(user?.country || '');
  const [userCity, setCity] = useState<string | undefined>(user?.city || '');
  const [userRregion, setRegion] = useState<string | undefined>(user?.region || '');
  const [telNumber, setTelNumber] = useState<string | undefined>(user?.tel_number || '');
  const [selectedRegion, setSelectedRegion] = useState(
    languageReducer.language ? 'Select region' : 'Виберіть вашу область'
  );
  const [isSelect, setIsSelect] = useState(false);
  const [errors, setErrors] = useState({
    tel_number: '',
    tel_numberUkr: '',
  });
  
  const handleNumber = (e) => {
    setTelNumber(e.target.value);
    setErrors({
      tel_number: '',
      tel_numberUkr: '',
    });
  };

  const handleToggleSelect = () => setIsSelect((prev: boolean) => !prev);

  const handleRegionClick = (region): void => {
    setSelectedRegion(region);
    setRegion(region);
    console.log(region)
    handleToggleSelect();
  };

  useEffect(() => {
    if (registrationReducer.registration.access || registrationReducer.registration.refresh) {
      getUser(registrationReducer.registration.access)
      .then((userFromServer) => {
        setUser(userFromServer)
      })
    }
  }, [registrationReducer.registration.access, registrationReducer.registration.refresh]);

  useEffect(() => {
    setFirstName(user?.first_name || '');
    setLastName(user?.last_name || '');
    setRegion(user?.region || '');
    setCity(user?.city || '');
    setTelNumber(user?.tel_number || '');
  }, [user]);

  const handleConfirm = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${registrationReducer.registration.access}`
        }
      };
  
      const url = 'http://127.0.0.1:8000/api/user/me/';
  
      const requestData = {
        first_name: firstName,
        last_name: lastName,
        tel_number: telNumber,
        region: userRregion,
        city: userCity,
      };
  
      await axios.put(url, requestData, config);
  
      const updatedUser = await getUser(
        registrationReducer.registration.access ||
        registrationReducer.registration.refresh 
      );
      setUser(updatedUser);
      window.location.reload();
    } catch (error) {
      setErrors({
        tel_number: 'Invalid number, it must be 13 digits',
        tel_numberUkr: 'Некоректний номер, повинно бути 13 цифр',
      });
    }
  }
    
  return (
    <div className={classNames("profileLogic__mainContainer ", {
      'profileLogic__mainContainer--border': noProfile,
    })}>

      <h1 className="profileLogic__headerText">
        My Profile
      </h1>

    <div className="profileLogic__miniCont">
      <p className="profileLogic__profileImg header__img"/>

        <div className="profileLogic__info">
          <div className="profileLogic__name">
            {`${firstName} ${lastName}`}
          </div>

          <div className="profileLogic__location">
            City
          </div>

          <div className="profileLogic__phone">
            {`+38${telNumber}`}
          </div>
        </div>
    </div>
 

      <div className="profileLogic__inputBox">
        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'First name*'
              : 'Ім\'я*'}
          </p>
        
          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
          <input
            type="text"
            className="signUpLogic__input"
            placeholder={
              languageReducer.language
                ? 'Enter your email first name'
                : 'Введіть ваше ім\'я'
            }
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        </div>

        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Last name*'
              : 'Призвіще*'}
          </p>
        
          <label
              className="signUpLogic__miniContainer"
              htmlFor="searchInput"
            >
            <input
              type="text"
              className="signUpLogic__input"
              placeholder={
                languageReducer.language
                  ? 'Enter your email last name'
                  : 'Введіть ваше прізвище'
              }
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        
        <div className="signUpLogic__miniContainer signUpLogic__miniContainer--box">
            <p className="signUpLogic__text">
              {languageReducer.language
                ? 'Your region*'
                : 'Вашу область*'}
            </p>
          
          <button
              className="signUpLogic__miniContainer signUpLogic__input signUpLogic__input--box"
              onClick={handleToggleSelect}
            > 
            {selectedRegion}
            </button>

            {isSelect && (
                <ul className="orderForm__regionCont">
                  {region.map(item => (
                    <li 
                      key={item} 
                      className="orderForm__region"
                      onClick={() => handleRegionClick(item)}
                    >
                      {item}
                    </li>
                    )
                  )}
                </ul>
              )}
          </div>
        
        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Your city*'
              : 'Ваше місто*'}
          </p>

          <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
            <input
              type="text"
              className="signUpLogic__input"
              placeholder={
                languageReducer.language
                  ? 'Enter your city'
                  : 'Введіть ваше місто'
              }
              value={userCity}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>

        <div className="signUpLogic__miniContainer">
          <p className="signUpLogic__text">
            {languageReducer.language
              ? 'Contact number*'
              : 'Номер телефону*'}
          </p>
      
        <label
            className="signUpLogic__miniContainer"
            htmlFor="searchInput"
          >
          <input
            type="tel"
            name="phone"
            pattern="\+[0-9]{1,4}\s?[0-9]{1,14}"
            className={classNames("signUpLogic__input", {
              'signUpLogic__error': errors.tel_number,
            })}
            placeholder='000 000 000 00'
            value={telNumber}
            onChange={handleNumber}
          />
            
        {errors.tel_number && (
          <div className="signUpLogic__errorText">
              {
              languageReducer.language 
              ? errors.tel_number
              : errors.tel_numberUkr
            }
          </div>
          )}
        </label>
      </div>

        <button
          className="
            signUpLogic__green 
            signUpLogic__button2
            signUpLogic__button2
          "
          onClick={handleConfirm}
        >
        {
          languageReducer.language
            ? 'Confirm'
            : 'Продовжити'
        }
        </button>
    </div>
  </div>
  );
}