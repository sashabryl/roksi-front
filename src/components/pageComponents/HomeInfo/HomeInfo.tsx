import { useAppSelector } from "../../../app/hooks";
import "./HomeInfo.scss";

export const HomeInfo = () => {
  const languageReducer = useAppSelector(state => state.language);

  return (
    <div className="homeInfo">
      <div className="homeInfo__flex">
        <div className="homeInfo__img homeInfo__img--1"/>

        <div className="homeInfo__miniCont">
          <p className="homeInfo__text">
            {languageReducer.language 
              ?('DESKPASS INSTANT WORKSPACE')
              :('МИТТЄВИЙ РОБОЧИЙ ПРОСТІР DESKPASS')
            }
          </p>
          <div className="homeInfo__bigText">
          {languageReducer.language 
              ?('Instantly reserve desks, conference rooms, or a private office')
              :('Миттєво забронюйте робочі місця, конференц-зали a6o приватний офіс')
            }
          </div>
        </div>
      </div>

      <div className="homeInfo__rowReverse">
        <div className="homeInfo__img homeInfo__img--2"/>

        <div className="homeInfo__miniCont">
          <p className="homeInfo__text">
            {languageReducer.language 
              ?('DESKPASS TEAMS')
              :('КОМАНДИ DESKPASS')
            }
          </p>
          <div className="homeInfo__bigText">
            {languageReducer.language 
              ?('Easily launch and manage a complete hybrid work strategy')
              :('Легко запускайте та управляйте повноцінною стратегією гібридної роботи')
            }
          </div>
        </div>
      </div>

      <div className="homeInfo__flex">
        <div className="homeInfo__img homeInfo__img--3"/>

        <div className="homeInfo__miniCont">
          <p className="homeInfo__text">
            {languageReducer.language 
              ?('OUR MISSION IS SIMPLE')
              :('НАША МІСІЯ ПРОСТА')
            }
          </p>
          <div className="homeInfo__bigText">
          {languageReducer.language 
              ?('Integrate existing offices into your flexible work benefits program')
              :('Інтегруйте існуючі офіси y вашу програму користування гнучкими робочими можливостями')
            }
          </div>
        </div>
      </div>
    </div>
  );
}