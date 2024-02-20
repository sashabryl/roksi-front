import { useEffect, useMemo, useState } from "react";
import "./MainPage.scss";
import { Cherwood } from "../../../helpers/Cherwood";
import { getCherwood } from "../../../api";
import { Card } from "../../pageComponents/Card/Card";
import { Select } from "../../pageComponents/Select/Select";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { getFilteredCherwood } from "../../../helpers/FilteredCherwood";
import { NotFoundSearch } from "../../pageComponents/NotFoundSearch/NotFoundSearch";
import { Header } from "../../pageComponents/Header/Header";
import { Footer } from "../../pageComponents/Footer/Footer";
import { Author } from "../../pageComponents/Author/Author";

import flover from "../../../img/flover.jpg";
import vaza from "../../../img/vaza.jpg";

const imagePerRow = 6;

export const MainPage = () => {
const [cherwood, setCherwood] = useState<Cherwood[]>([]);
const [next, setNext] = useState(imagePerRow);
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
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const tupe = searchQuery.get('tupe')|| '';;
const filter = searchQuery.get('filter')|| '';
const search = searchQuery.get('query')|| '';

let stateCard = useMemo(() => {
  let newCard = cherwood;

  if (tupe !== '') {
    const searchParams = new URLSearchParams(tupe);
    const selectedOptions = Array.from(searchParams.getAll("selectedOptions"));

    const result = selectedOptions
      .map(option => option.split('+'))
      .flat()
      .map(decodeURIComponent)
      .map(term => term.toLowerCase());

    newCard = cherwood.filter((product) => {
      const productWords = product.subcategory_name_eng.toLowerCase().split(' ');

      return result.some((term) => productWords.includes(term));
    });
  }

  if (filter !== '') {
    const searchTerms = filter.toLowerCase().trim().split(' ');
    const extractedString = searchTerms[0];

    newCard = getFilteredCherwood(newCard, extractedString);
  }

  if (search !== '') {
  const searchTerms = search.toLowerCase().trim().split(' ');

  newCard = cherwood.filter((product) => {
    let productWords: string[] = [];

    if (languageReducer.language) {
       productWords = product.name_eng.toLowerCase().split(' ');
    } else {
      productWords = product.name.toLowerCase().split(' ');
    }
    const ddd = searchTerms.every((term) => productWords
      .some((word) => word.includes(term)));

      return ddd;
  });
  }

  return newCard;
}, [tupe, filter, cherwood, search]);

const handleMoreImage = () => {
  setNext(next + imagePerRow);
  console.log(stateCard)
};

  return (
    <>
    <Header />
    <div className="main">
      <div className="main__topOptions">
      <div className="main__miniContainer main__miniContainer--colum">
        <div className="main__watch">
        <Select />
          {windowWidth > 780 &&(<div 
            className="main__defolt" 
            onClick={() =>setNext(15)}
          >
            {languageReducer.language 
              ?('View all')
              :('Усі')
            }
          </div>)}
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

      {stateCard.length > 0
      ?(<div className="main__cardContainer">
        {stateCard.slice(0, next).map(prod => (
          <Card cherwood={prod} key={prod.id}/>
        ))}
      </div>)
      :(<NotFoundSearch />)}
      
     {windowWidth > 780 &&( <div className="main__buttonContainer">
      {next < stateCard?.length && (
        <button 
          className="main__button" 
          onClick={handleMoreImage}
        >
           {languageReducer.language 
             ?('Show more')
             :('Показати більше')
           }
         </button>
        )}
    
      </div>)}

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