import { useEffect, useState } from "react";
import { Cherwood } from "../../../helpers/Cherwood";
import { BackButton } from "../../pageComponents/BackButton/BackButton"; 
import { Header } from "../../pageComponents/Header/Header"; 
import { Footer } from "../../pageComponents/Footer/Footer"; 
import { getCherwood, getUser } from "../../../helpers/api";
import { Card } from "../../pageComponents/Card/Card";
import { useAppSelector } from "../../../app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { UserType } from "../../../helpers/UserType";
import { Author } from "../../pageComponents/Author/Author";


export const Like = () => {
  const [user, setUser] = useState<UserType>();
  const [cherwood, setCherwood] = useState<Cherwood[]>([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const favoriteCherwood = cherwood.filter(item => user?.favourites.includes(item.id));
  const navigate = useNavigate();

useEffect(() => {
  getUser(registrationReducer.registration.access)
  .then((userFromServer) => {
    setUser(userFromServer)
  })
}, []);

useEffect(() => {
  getCherwood()
  .then((cherwoodFromServer) => {
    setCherwood(cherwoodFromServer)
  })
}, []);


  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const shouldShow = screenWidth <= 780;

   return (
    <div className="modal">
      <div className="modal__background">
        {shouldShow && <Header />}
        <div className="modal__top">
        <BackButton />
        <p 
          className="filter__cross cross__none"
          onClick={handleGoBack}
        />
        </div>

       {user?.favourites
        ?(
          <div className="modal__items">
            {favoriteCherwood.map((item)=> (
              <Card cherwood={item} key={item.id}/>
            ))}
          </div>
          )
        :(
          <NavLink className="modal__empty" to="/" >
          <p className="modal__like2" />
          <h1 className="modal__text2">
            {languageReducer.language 
              ?('There are no products in the favorite')
              :("У вибраному немає товарів")
            }
          </h1>

          <h2 className="modal__text3">
            {languageReducer.language 
              ?('Look at our catalog, you will definitely find something')
              :("Перегляньте наш каталог, ви обов'язково щось знайдете")
            }
          </h2>

          <button className="modal__button2 modal__button">
            {languageReducer.language 
              ?('Go to shop')
              :("Перейти в магазин")
            }

            <p className="modal__arrow" />
          </button>
        </NavLink>
        )}

        {shouldShow && <Author />}
        {shouldShow && <Footer />}
      </div>
    </div>
   );
}