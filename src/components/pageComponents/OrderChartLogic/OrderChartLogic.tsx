import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { CardinChard } from "../CardinChard/CardinChard";
import { Cherwood } from "../../../helpers/Cherwood";

type Props = {
  inChart: Cherwood [];
  handleRemove: () => void,
}

export const OrderChartLogic: React.FC<Props> = ({inChart, handleRemove}) => {
  const languageReducer = useAppSelector(state => state.language);

  return (
    <div className="chart__items">
       <h2 className="chart__textHeader">
          {languageReducer.language 
            ?('Cart')
            :('Корзина')
          }
      </h2>

      {inChart.length > 0 ?(
        <div className="chart__items">
          {inChart.map((item) => (
            <CardinChard key={item.id} card={item} handleRemove={handleRemove}/>
          ))}
      
      <div className="chart__buttonContainer">
        <NavLink 
          to='/order' 
          className="modal__button2 modal__button" 
        >
          {languageReducer.language ? 'Continue' : 'Продовжити'}
          <p className="modal__arrow" />
          </NavLink>
        </div>
      </div>
      ) : (
      <div className="chart__container">
        <p className="chart__no" />

        <h1 className="chart__bigText">
          {languageReducer.language ? (
            'There are no products in the cart'
          ) : (
            'У кошику немає товарів'
          )}
        </h1>
        <h3 className="chart__miniText">
          {languageReducer.language ? (
            'Look at our catalog, you will definitely find something'
          ) : (
            'Перегляньте наш каталог, ви обов\'язково знайдете щось цікаве'
          )}
        </h3>

        <NavLink to="/" className="modal__button2 modal__button">
          {languageReducer.language ? 'Go to shop' : 'Перейти в магазин'}
          <p className="modal__arrow" />
        </NavLink>
      </div>
     )} 
    </div>
  );
}