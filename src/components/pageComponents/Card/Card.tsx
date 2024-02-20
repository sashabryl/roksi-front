import React, { useState } from "react";
import { Cherwood } from "../../../helpers/Cherwood.js";
import "./Card.scss";
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "../../../app/hooks";
import { LikeAndChart } from "../LikeAndChart/LikeAndChart";

type Props = {
  cherwood: Cherwood,
}

export const Card: React.FC<Props> = ({ cherwood }) => {
  const [isSelect, setIsSelect] = useState(false);
  const languageReducer = useAppSelector(state => state.language);

  const hendlModal = () => {
    setIsSelect(!isSelect);
} 

  return (
    <>
      <div className="card">
        <div className="card__top">
          <img 
            className="card__img" 
            alt="img" 
            onClick={hendlModal}
          />

          <LikeAndChart id={cherwood.id}/>
        </div>

      <div className="card__header" onClick={hendlModal}>
        <div className="card__header--1">
          <h2 className="card__size">
            {languageReducer.language 
              ?('Size')
              :('Розмір')
            }
          </h2>
          <p className="card__size--img">
            <p className="card__size--img--1"/>
            <p className="card__size--img--2"/>
          </p>
          <p className="card__size--number">{`${cherwood.price}`}</p>
        </div>

        <div className="card__header--2">
          <h1 className="card__name">
            {languageReducer.language 
              ?cherwood.name_eng
              :cherwood.name
            }
          </h1>
          <p className="card__price">{`$ ${cherwood.price}`}</p>
        </div>
      </div>
    </div>

    {isSelect &&(<Modal card={cherwood} hendlCloseModal={hendlModal}/>)}
  </>
  );
}