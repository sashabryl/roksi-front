import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { getBooking, getCherwood} from "../../../helpers/api";
import { Modal } from "../Modal/Modal";

import "./HistoryLogic.scss"
import { NavLink } from "react-router-dom";
import { BookingItem } from "../../../helpers/BookingInterface";
import { Cherwood } from "../../../helpers/Cherwood";

export const HistoryLogic = () => {
  const [cherwood, setCherwood] = useState<BookingItem[]>([{ id: 0, total: '', created_at: '', order_items: [] }]);
  const [allcherwood, setAllCherwood] = useState<Cherwood[]>([]);
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
    getCherwood()
      .then((straviFromServer) => {
        setAllCherwood(straviFromServer);
      })
  }, []);

  const filteredCherwood = allcherwood.filter(item => {
    return cherwood.some(cherwoodItem => cherwoodItem.order_items && cherwoodItem.order_items.includes(item.id));
});

  return (
    <div className="historyLogic">
      <h1 className="historyLogic__header">
        {languageReducer.language 
          ? 'Reservations history'
          :'Історія бронювань'
        }
      </h1>

  {filteredCherwood.length > 0 ?
        filteredCherwood.map(card => (
          <div className="historyLogic__chard cardinChard" key={card.id}>
            <img 
              alt="cardImg" 
              className="cardinChard__img"
              onClick={hendlModal}
            />

            <div className="cardinChard__container historyLogic__container">
              <div className="cardinChard__top">
                <div className="cardinChard__name">
                  {languageReducer.language ? card.name : card.name_eng}
                </div>

                <div className="cardinChard__price">
                  {`₴${card.price}`}
                </div>
              </div>

              <div className="cardinChard___descr">
                <div className="modal__minicontainer2">
                  <p className="modal__type">
                    {languageReducer.language ? 'Wight:' : 'Bara:'}
                  </p>
                  <p className="modal__number">{card.width}</p>

                  <p className="modal__slash">/</p>

                  <p className="modal__type">
                    {languageReducer.language ? 'Height:' : 'Висота:'}
                  </p>
                  <p className="modal__number">{card.height}</p>
                </div>

                <div className="modal__minicontainer2">
                  <p className="modal__type">
                    {languageReducer.language ? 'Material:' : 'Матеріал:'}
                  </p>
                  <p className="modal__text">
                    {languageReducer.language ? card.material_eng : card.material}
                  </p>
                </div>
              </div>
            </div>

            {isSelect && <Modal card={card} hendlCloseModal={hendlModal} />}
          </div>
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