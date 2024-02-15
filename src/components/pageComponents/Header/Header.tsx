import { NavLink } from 'react-router-dom';
import "./Header.scss";
import { useEffect, useState } from 'react';
import { Filter } from '../Filter/Filter';
import { Profile } from '../Profile/Profile';
import { scrollToFooter } from '../../../helpers/helpers';
import { getChart } from '../../../api';
import { CartItem } from '../../../helpers/ChartInterface';
import { LanguageChange } from '../LanguageChange/LanguageChange';
import { useAppSelector } from '../../../app/hooks';

export const Header = () => {
  const [chart, setChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const languageReducer = useAppSelector(state => state.language);
  const chartReload = useAppSelector(state => state.chart);
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

  useEffect(() => {
    getChart()
    .then((chartData) => {
      setChart(chartData);
    })
    .catch((error) => {
      console.error(error);
    });
}, [chartReload.chart]);

    return (
    <div className="header">
      <div className="header__mainContainer">
          <NavLink
            to="/"
            className="logo"
          />

          <div className="header__container">
            <div className="header__container header__container--row-reverse">
             {windowWidth < 780 &&( 
             <a 
              href="https://www.instagram.com/cherwoodjoinery?igsh=bmhicHduZjdkOG42" 
              className="main__insta" 
              target="_blank"
            />)}

              <NavLink className="header__chart--cont" to="/chart" >
                <div 
                  className="header__chart header__img"
                >
                {chart.products.length !== 0 && (
                  <div className="header__amount">
                    {chart.products.length}
                  </div>
                )}
                </div>
              </NavLink>
            </div>

            {/* {registrationReducer.registration.access && ( */}
              <div className="header__favorites--cont">
                <NavLink to="/favorites" className="header__favorites header__img" />
              </div>
            {/* )} */}

            <LanguageChange />
            <Profile />
          </div>
        </div>
    </div>
  );
}