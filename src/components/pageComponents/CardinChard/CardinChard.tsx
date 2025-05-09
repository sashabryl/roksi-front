import { useAppSelector } from "../../../app/hooks";
import { ApiInterface } from "../../../helpers/ApiInterface";
import "./CardinChard.scss";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { handleChart } from "../../../helpers/api";
import { useLocation } from "react-router";

type Props = {
  card: ApiInterface;
  wasOrdered?: string,
  handleRemove: () => void,
}

export const CardinChard: React.FC<Props> = ({card, wasOrdered, handleRemove}) => {
  const [isSelect, setIsSelect] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [change, setChange] = useState(false);
  const languageReducer = useAppSelector(state => state.language);

  const location = useLocation();
  
  const shouldRenderButton = location.pathname !== '/history';

  const hendlModal = () => {
    setIsSelect(!isSelect);
  } 

  const hendleActChart = (action: string) => {
    handleChart(action, card.id);
    setChange(!change);
    handleRemove();
  } 

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
    <div className="cardinChard">
      <div className="cardinChard__headCont">
      <img 
        alt="cardImg" 
        className="cardinChard__img"
        src={card.main_image}
        onClick={hendlModal}
      />
    </div>

    <div className="cardinChard__container">

      {!shouldRenderButton &&(
         <div className="cardinChard__minicontainer">
         <p className="modal__type">
         {languageReducer.language 
           ?('Was ordered:')
           :("Було замовлено:")
         }
         </p>
         <p className="modal__text">
           {wasOrdered}
         </p>
       </div>
      )}

      <div className="cardinChard__top">
          <div className="cardinChard__name">
          {languageReducer.language 
              ? card.name
              :card.name_eng
            }
          </div>

          <div className="cardinChard__price">
          {`$${card.price}`}
          </div>
        </div>

        {windowWidth < 780 &&( 
          <div className="modal__minicontainer2">
              <p className="modal__type">
              {languageReducer.language 
                ?('Material:')
                :("Матеріал:")
              }
              </p>
              <p className="modal__text">
                {languageReducer.language 
                  ?card.material_eng
                  :card.material
                }
              </p>
            </div>
          )}

        <div className="cardinChard___descr">
        {windowWidth > 780 ?( 
        <div className="cardinChard__minicontainer">
             <div className="cardinChard__miniCont cardinChard__miniCont--border">
              <div className="cardinChard__miniCont--2">
                <p className="modal__type">
                  {languageReducer.language 
                    ?('Size')
                    :("Розмір")
                  }
                </p>
                <p className="cardinChard__heightImg" />
              </div>

              <p className="cardinChard__number">
                {`${card.height} 
                  ${languageReducer.language 
                    ?('sm')
                    :("см")}`
                }</p>
              </div>
             

              <div className="cardinChard__miniCont">
              <div className="cardinChard__miniCont--2">
                <p className="modal__type">
                  {languageReducer.language 
                    ?('Size')
                    :("Розмір")
                  } 
                </p>
                <p className="cardinChard__widthImg" />
              </div>
              <p className="cardinChard__number">
                {`${card.width} 
                  ${languageReducer.language 
                    ?('sm')
                    :("см")
                  }`
                }</p>
              </div>
            </div>
             ) : (
            <div className="cardinChard__minicontainer">
             <div className="cardinChard__miniCont">
              <p className="modal__type">
              {languageReducer.language 
                ?('Wight:')
                :("Ширина:")
              }
              
              </p>
              <p className="cardinChard__number">
                {`${card.width} 
                  ${languageReducer.language 
                    ?('sm')
                    :("см")
                  }`
                }</p>

              <p className="cardinChard__slash">/</p>

              <p className="modal__type">
              {languageReducer.language 
                ?('Height:')
                :("Висота:")
              }
              </p>
              <p className="cardinChard__number">
                {`${card.height} 
                  ${languageReducer.language 
                    ?('sm')
                    :("см")
                  }`
                }</p>
              </div>
            </div>
             )}
          </div>

          <div className="cardinChard__count">
         {windowWidth > 780 &&( 
          <div className="cardinChard__minicontainer">
              <p className="modal__type">
              {languageReducer.language 
                ?('Material:')
                :("Матеріал:")
              }
              </p>
              <p className="modal__text">
                {languageReducer.language 
                  ?card.material_eng
                  :card.material
                }
              </p>
            </div>
          )}
            {shouldRenderButton && (
              <button 
                className="cardinChard__count--remove"
                onClick={() => hendleActChart('remove')}
              >
                <p className="cardinChard__count--remove--dump" />
                <h2 className="cardinChard__count--remove--text">
                  {languageReducer.language 
                    ?('Remove')
                    :("Видалити")
                  }
                </h2>
              </button>
            )}
          </div>
      </div>

      {isSelect &&(<Modal card={card} hendlCloseModal={hendlModal}/>)}
    </div>
  );
}