import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getBooking, getApi} from "../../../helpers/api";

import "./HistoryLogic.scss"
import { NavLink } from "react-router-dom";
import { BookingItem } from "../../../helpers/BookingInterface";
import { ApiInterface } from "../../../helpers/ApiInterface";
import { CardinChard } from "../CardinChard/CardinChard";

export const HistoryLogic = () => {
  const [cherwood, setCherwood] = useState<BookingItem[]>([{ id: 0, get_date: '', product: 0, quantity: 0, calculate_total: 0}]);
  const [api, setApi] = useState<ApiInterface[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);
  const registrationReducer = useAppSelector(state => state.registration);

  const hendlModal = () => {
    setIsSelect(!isSelect);
  } 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const straviFromServer = await getBooking(registrationReducer.registration.access);
        if (straviFromServer) {
          setCherwood(straviFromServer);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getApi()
      .then((straviFromServer) => {
        setApi(straviFromServer);
      })
  }, []);

  let filteredCherwood:ApiInterface[] = []

  if (cherwood.length !== 0 || api.length !==0) {
    cherwood.forEach(cherwoodItem => {
      const filteredItems = api
        .filter(item => item.id === cherwoodItem.product)
        .map(item => ({ ...item, get_date: cherwoodItem.get_date }));
        filteredCherwood = filteredCherwood.concat(filteredItems);
    });
  }

  return (
    <div className="historyLogic">
      <h1 className="historyLogic__header">
        {languageReducer.language 
          ? 'Reservations history'
          :'Історія бронювань'
        }
      </h1>

    {filteredCherwood.length > 0 ?
        filteredCherwood.map((card, index) => (
          <CardinChard card={card} handleRemove={hendlModal} wasOrdered={card.get_date} key={index}/>
        ))
        : 
        <div className="historyLogic__empty">
          <p className="historyLogic__search"/>

          <h1 className="historyLogic__no">
            {languageReducer.language 
              ? 'There was no order'
              : 'Замовлень не було'
            }
          </h1>

          <NavLink to="/" className="modal__button2 modal__button">
            {languageReducer.language ? 'Go to shop' : 'Перейти в магазин'}
            <p className="modal__arrow" />
          </NavLink>
        </div>
      } 
    </div>
  );
}