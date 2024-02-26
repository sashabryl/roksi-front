import { useEffect,  useState } from "react";
import "./MainPage.scss";
import { Cherwood } from "../../../helpers/Cherwood";
import { getCherwood, getOptions } from "../../../helpers/api";
import { Card } from "../../pageComponents/Card/Card";
import { Select } from "../../pageComponents/Select/Select";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { NotFoundSearch } from "../../pageComponents/NotFoundSearch/NotFoundSearch";
import { Header } from "../../pageComponents/Header/Header";
import { Footer } from "../../pageComponents/Footer/Footer";
import { Author } from "../../pageComponents/Author/Author";

import flover from "../../../img/flover.jpg";
import vaza from "../../../img/vaza.jpg";
import { Option, Subcategory } from "../../../helpers/Options";

export const MainPage = () => {
const [cherwood, setCherwood] = useState<Cherwood[]>([]);
const [ophtions, setOpthions] = useState<Option[]>([]);
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

const [searchQuery] = useSearchParams();
const languageReducer = useAppSelector(state => state.language);

useEffect(() => {
  getCherwood()
    .then((straviFromServer) => {
      setCherwood(straviFromServer);
    })
}, []);

useEffect(() => {
  getOptions()
    .then((straviFromServer) => {
      setOpthions(straviFromServer);
    })
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

const name = searchQuery.get('name')|| '';

const names = name.split(',');

let filteredCards: Cherwood[] = [];
let subcategories: Subcategory[] = [];

names.forEach(singleName => {
  const category: Option | undefined = ophtions.find(category => category.name_eng === singleName.trim());

  if (category) {
    const subcategoriesForCategory = category.subcategories;
    subcategories.push(...subcategoriesForCategory);

    subcategoriesForCategory.forEach(subcategory => {
      const cardsForSubcategory = cherwood.filter(card => card.subcategory_name_eng === subcategory.name_eng);
      filteredCards.push(...cardsForSubcategory);
    });
  }
});

  return (
    <>
    <Header />
    <div className="main">
      <div className="main__topOptions">
      <div className="main__miniContainer main__miniContainer--colum">
        <div className="main__watch">
        <Select />
        </div>
      </div>

      <div className="main__miniContainer">
        {windowWidth > 780 &&( 
          <a 
          href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
          className="main__insta" 
          target="_blank"
        />)}

        {windowWidth > 780 &&( 
          <a 
          href="mailto:roksolanahrudshyk@gmail.com" 
          className=" home__email"
        />)}
      </div>
      </div>

      {filteredCards.length > 0 ? (
        subcategories.map(subcategory => (
          <div className="main__itemsMainCont" key={subcategory.name_eng}>
            <div className="main__itemsMainCont--name">
              {languageReducer.language 
                ? subcategory.name_eng 
                : subcategory.name
              }
            </div>
            <div className="main__cardContainer">
              {filteredCards
                .filter(card => card.subcategory_name_eng === subcategory.name_eng)
                .map(prod => (
                  <Card cherwood={prod} key={prod.id} />
                ))}
            </div>
          </div>
        ))
      ) : (
        <NotFoundSearch />
      )}

      <Author />

      {windowWidth > 780 &&(<div className="main__img--cont">
        <img src={flover} alt="art" className="main__img" />
        <img src={vaza} alt="art" className="main__img" />
      </div>
      )}
    </div>
    <Footer />
    </>
  );
}