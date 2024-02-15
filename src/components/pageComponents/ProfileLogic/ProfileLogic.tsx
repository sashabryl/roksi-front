import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../BackButton/BackButton";
import './ProfileLogic.scss'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import classNames from "classnames";
import { ProfileMainInfo } from "../ProfileMainInfo/ProfileMainInfo";
import { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { HistoryLogic } from "../HistoryLogic/HistoryLogic";
import { LogOut, getChart } from "../../../api";
import { CartItem } from "../../../helpers/ChartInterface";
import { addRegistrationAction } from "../../../app/slice/RegistrSlice";

type Props = {
  profile: boolean;
}

export const ProfileLogic: React.FC<Props> = ({profile}) => {
  const languageReducer = useAppSelector(state => state.language);
  const [chart, setChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const registrationReducer = useAppSelector(state => state.registration);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    LogOut(registrationReducer.registration.access || registrationReducer.registration.refresh);
    dispatch(addRegistrationAction({
      access: '',
      refresh: '',
    }));
    navigate('/')
  };


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
}, []);


  const isActiveNav = ({ isActive }: { isActive: boolean }) => classNames(
    'profileLogic__link', { profileLogic__active: isActive },
  );

  return (
    <div className="profileLogic">
      <header className="profileLogic__header">
        <NavLink to='/' className="logo"/>

        {windowWidth > 780 &&(<div className="chart__header--cont">
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

          <NavLink 
            to="/favorites" 
            className="header__favorites header__img"
          />
        </div>)}
      </header>
      {windowWidth > 780 &&(<BackButton />)}

      <div className="profileLogic__container">
        <div className="profileLogic__nav">
          <div className="profileLogic__nav--box">
            <NavLink to='/profile' className={isActiveNav}>
              <p className={classNames("profileLogic__profile header__img", {
                'profileLogic__profile-active': location.pathname === '/profile' 
                })} 
              />
              {windowWidth > 780 && (
                languageReducer.language
                  ? 'Profile'
                  : 'Профіль'
                )}
            </NavLink>
            {windowWidth < 780 &&(
             <div className="profileLogic__nav--text">
                {languageReducer.language
                  ? 'Profile'
                  : 'Профіль'
                }
             </div> 
            )}
          </div>
          {/* <NavLink to='/payment' className={isActiveNav}>
            <p className={classNames("profileLogic__payment header__img", {
              'profileLogic__payment-active': location.pathname === '/payment' 
              })} 
            />
            {
              languageReducer.language 
                ?('Payment')
                :('Платіж')
            }
          </NavLink> */}

      <div className="profileLogic__nav--box">
        <NavLink to='/history' className={isActiveNav}>
            <p className={classNames("profileLogic__history header__img", {
             'profileLogic__history-active': location.pathname === '/history' 
            })} 
          />
            {windowWidth > 780 && (
              languageReducer.language
                ? 'Reservations history'
                : 'Історія бронювань'
            )}
          </NavLink>
            {windowWidth < 780 &&(
             <div className="profileLogic__nav--text">
              {languageReducer.language 
                ?('History')
                :('Історія')
              }
             </div> 
            )}
      </div>
          
      <div className="profileLogic__nav--box" onClick={handleLogOut}> 
        <div className="profileLogic__link profileLogic__link--red">
          <p className="profileLogic__logout header__img" />
              {windowWidth > 780 &&( 
                languageReducer.language 
                  ?('Logout')
                  :('Вийти')
              )}
            </div>

            {windowWidth < 780 &&(
             <div className="profileLogic__nav--text">
              {languageReducer.language 
                  ?('Logout')
                  :('Вийти')
              }
             </div> 
            )}
          </div>
        </div>

        {windowWidth < 780 &&(<BackButton />)}

      {profile 
        ?(<ProfileMainInfo noProfile={true}/>)
        :(<HistoryLogic />)
      }
      </div>

      {windowWidth < 780 &&(<Footer />)}
    </div>
  );
}