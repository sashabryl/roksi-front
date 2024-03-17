import React, { useEffect, useState } from "react";
import { ApiInterface } from "../../../helpers/ApiInterface";
import "./Modal.scss";
import { BackButton } from "../BackButton/BackButton";
import { Slide } from "react-slideshow-image";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { getChart } from "../../../helpers/api";
import { LikeAndChart } from "../LikeAndChart/LikeAndChart";
import { CartItem } from "../../../helpers/ChartInterface";
import axios from "axios";
import { changeChartAction } from "../../../app/slice/ChartSlice";
import { useNavigate } from "react-router";
import { Author } from "../Author/Author";

type Props = {
  card: ApiInterface,
  hendlCloseModal: () => void; 
};

const arrowButtons = {
  prevArrow:
  <button
    type="button"
    className="
        carousel__button
        carousel__button--prev
      "
  >
    {' '}
  </button>,

  nextArrow:
  <button
    type="button"
    className="
        carousel__button
        carousel__button--next
      "
  >
    {' '}
  </button>,
};

export const Modal: React.FC<Props> = ({ card, hendlCloseModal }) => {
  const [isInChart, setIsInChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const languageReducer = useAppSelector(state => state.language);
  const currentChartState = useAppSelector((state) => state.chart.chart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
const shouldShow = screenWidth <= 780;
let inChart = false;

useEffect(() => {
  getChart()
  .then((chartData) => {
    setIsInChart(chartData);
  })
  .catch((error) => {
    console.error(error);
  });
}, [currentChartState]);

useEffect(() => {
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [])

const handleChart = async () => {
  try {
    const currentAction = inChart ? null : 'add';

    const data = {
      product_id: card.id,
      action: currentAction,
    };

    const url = 'http://127.0.0.1:8000/api/cart/';

    await axios.post(url, data);

    dispatch(changeChartAction(!currentChartState));

    navigate('/chart')
  } catch (error) {
    console.log(error);
  }
};

if (isInChart.products.length > 0) {
  inChart = isInChart.products.some(((product) => product.id === card.id)
  );
}

   return (
    <div className="modal">
      <div className="modal__background">
        {shouldShow && <Header />}
        <div className="modal__top">
        <BackButton hendlCloseModal={hendlCloseModal}/>
        <button 
          className="filter__cross cross__none"
          onClick={hendlCloseModal} 
        />
        </div>

      <div className="modal__carousel">
        <Slide {...arrowButtons} duration={3000} indicators>
            {card.images.map((photo, index) => (
              <div key={index} className="each-slide">
                <img 
                  src={photo.image} 
                  className={`modal__slide`} 
                />
              </div>
            ))}
        </Slide>
      </div>

        <div className="modal__header">
          <LikeAndChart id={card.id} noAbsolute={true}/>

          <div className="modal__header--cont">
            <h1 className="modal__name">
              {languageReducer.language 
                ?card.name_eng
                :card.name
              }
            </h1>
            <p className="modal__price">{`$ ${card.price}`}</p>
          </div>


        </div>

        <div className="modal__descr">
          <div className="modal__minicontainer2">
            <p className="modal__type">
            {languageReducer.language 
              ?('Description:')
              :("Опис:")
            }
            </p>
            <p className="modal__text">
              {languageReducer.language 
                ?card.description_eng
                :card.description
              }
            </p>
          </div>

          <div className="modal__minicontainer3">
            <p className="modal__type">
            {languageReducer.language 
              ?('Wight:')
              :("Bara:")
            }
             
            </p>
            <p className="modal__number">{card.width}</p>

            <p className="modal__slash">/</p>

            <p className="modal__type">
            {languageReducer.language 
              ?('Height:')
              :("Висота:")
            }
            </p>
            <p className="modal__number">{card.height}</p>
          </div>

          <button className="modal__button" onClick={handleChart}>
            {languageReducer.language 
              ?('Order')
              :("Замовити")
            }
          </button>
        </div>

        {shouldShow && <Author />}
        {shouldShow && <Footer />}
      </div>
    </div>
   );
}