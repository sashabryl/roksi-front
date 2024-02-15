import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Footer } from "../Footer/Footer";
import { useAppSelector } from "../../../app/hooks";

import './SuccessOrder.scss'

export const SuccessOrder = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="successOrder">
       {windowWidth < 780 &&(
        <div className="chart__header--top">
          <NavLink to='/' className="logo"/>
        </div>
       )}

      <header className="chart__header">
        {windowWidth > 780 &&(<NavLink to='/' className="logo"/>)}

        <div className="chart__header--cont">
        {(registrationReducer.registration.access || registrationReducer.registration.refresh) && (
            <NavLink to="/favorites" className="header__favorites header__img" />
        )}

          <Profile />
        </div>
      </header>

      <div className="successOrder__body">
        <p className="successOrder__check" />

        <h1 className="successOrder__header">
          {languageReducer.language 
            ?('Success!')
            :('Успішно!')
          }
        </h1>

        <h3 className="successOrder__text">
          {languageReducer.language 
            ?('We have sent you purchase information to your email address')
            :('Ми надіслали вам інформацію про покупку на вашу електронну адресу')
          }
        </h3>
        
      <NavLink to="/" className="modal__button2 modal__button">
          {languageReducer.language ? 'Go to shop' : 'Перейти в магазин'}
          <p className="modal__arrow" />
      </NavLink>

      </div>
      {windowWidth < 780 &&( <Footer />)}
    </div>
  );
}