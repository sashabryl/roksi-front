import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

import img1 from '../../../img/b7d5c995c5030b78993dc9f6b17cc4d6.jpg';
import img2 from '../../../img/1765bb7769bcc5d19f1316398eb4f16e.jpg';
import img3 from '../../../img/e3f39328883ac0ffd7c7b2a0f9835ba7.jpg';
import img4 from '../../../img/f846386b245f0d75e659d0c7221a3956.jpg';

import './HomePage.scss';
import { Author } from "../../pageComponents/Author/Author";
import { Footer } from "../../pageComponents/Footer/Footer";
import { useEffect, useState } from "react";
import { LanguageChange } from "../../pageComponents/LanguageChange/LanguageChange";

export const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const languageReducer = useAppSelector(state => state.language);
  const imgArr = [img1, img2, img3, img4 ];

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
    <div className="home">
      <header className="home__header">
        <NavLink to='/mainPage' className="logo"/>
        <div className="home__header--cont">
          <a 
          href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
          className="home__insta" 
          target="_blank"
        />
        
        <a 
          href="mailto:roksolanahrudshyk@gmail.com" 
          className=" home__email"
        />

          <LanguageChange />
        </div>
      </header>

      <main className="home__main">
        <div className="home__descr">
          <h2 className="home__text2">
            {languageReducer.language 
              ?('RoksiArt Profesional Artist')
              :('Професійний художник RoksiArt')
            }
          </h2>

          {windowWidth > 780 &&(
            <h1 className="home__text1">
              {languageReducer.language 
                ?('Exclusive paintings')
                :('Ексклюзивні картини')
              }
            </h1>
          )}

          {windowWidth < 780 &&(
            <NavLink to='/mainPage' className="home__button">
              <p className="home__button--text">
                {languageReducer.language 
                  ?('Go to shop')
                  :('До магазину')
                }
              </p>
              <button className="home__button--button" >
                <p className="home__button--button--arr">

                </p>
              </button>
            </NavLink>
          )}

          <p className="home__text3">
            {languageReducer.language 
              ?('Incredible stained glass on vases, painted glasses, and paintings')
              :('Неймовірні вітражі на вазах, розписні скла, картини')
            }
          </p>

          {windowWidth > 780 &&(
            <NavLink to='/mainPage' className="home__button">
              <p className="home__button--text">
                {languageReducer.language 
                  ?('Go to shop')
                  :('До магазину')
                }
              </p>
              <button className="home__button--button" >
                <p className="home__button--button--arr">

                </p>
              </button>
            </NavLink>
          )}
        </div>

        <div className="home__img" ></div>
        <div className="home__img2" />
      </main>

      <div className="home__items">
        <h1 className="home__items--header">
          {languageReducer.language 
            ?('This is only tip of the iceberg')
            :('Це лише верхівка айсберга')
          }
        </h1>
        <div className="home__items--cont">
          {imgArr.map(item => (
            <img 
              src={item} 
              alt="img" 
              key={item} 
              className="home__items--img"
            />
          ))}
        </div>
        <NavLink to='/mainPage'className="home__items--buttom" >
          {languageReducer.language 
            ?('See more works')
            :('Переглянути більше робіт')
          }
        </NavLink>
      </div>

      <Author />

      <Footer />
    </div>
  );
}