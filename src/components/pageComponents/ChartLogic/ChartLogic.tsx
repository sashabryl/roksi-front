import { useEffect, useState } from "react";
import { getChart, getCherwood } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { Cherwood } from "../../../helpers/Cherwood";
import { CartItem } from "../../../helpers/ChartInterface";
import { NavLink } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { BackButton } from "../BackButton/BackButton";
import { OrderForm } from "../OrderForm/OrderForm";
import { Footer } from "../Footer/Footer";
import { OrderChartLogic } from "../OrderChartLogic/OrderChartLogic";

type Props = {
  isOrder: boolean,
}

export const ChartLogic: React.FC<Props> = ({isOrder}) => {
  const [chart, setChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cherwood, setCherwood] = useState<Cherwood[]>([]);
  const [prev, setsetPrev] = useState(1);
  const [change, setChange] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const handleRemove = () => {
    setChange(!change)
  }

useEffect(() => {
  getChart()
  .then((userFromServer) => {
    setChart(userFromServer)
  })
}, [change]);

useEffect(() => {
  getCherwood()
  .then((userFromServer) => {
    setCherwood(userFromServer)
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

const inChart = cherwood.filter((product) => chart.products.some((productId) => productId.id === product.id));

  return (
    <div className="chart">
      {windowWidth < 780 &&(
        <div className="chart__header--top">
          <NavLink to='/' className="logo"/>
        </div>
       )}

      <header className="chart__header">
        {windowWidth > 780 &&(<NavLink to='/' className="logo"/>)}

        <div className="chart__header--cont">
          {(registrationReducer.registration.access 
            || registrationReducer.registration.refresh
            ) &&(
             <NavLink 
              to="/favorites" 
              className="header__favorites header__img"
            />
            )}

          <Profile />
        </div>
      </header>

      <div className="chart__top">
        <BackButton/>

        <p className="chart__page">
          {`${prev}/2`}
        </p>
      </div>

      {isOrder 
      ?(
        <>
          <h2 className="chart__textHeader">
            {languageReducer.language 
              ?('Delivery contacts')
              :('Контакти доставки')
            }
          </h2>

          <OrderForm />
        </>
        )
      :(
        <OrderChartLogic inChart={inChart} handleRemove={handleRemove}/>
      )}
     
      {windowWidth < 780 &&( <Footer />)}
    </div>
  );
}