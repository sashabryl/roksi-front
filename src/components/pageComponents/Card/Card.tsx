import React, { useState } from "react";
import { ApiInterface } from "../../../helpers/ApiInterface.js";
import "./Card.scss";
import { Modal } from "../Modal/Modal";
import { useAppSelector } from "../../../app/hooks";
import { LikeAndChart } from "../LikeAndChart/LikeAndChart";

type Props = {
  api: ApiInterface,
}

export const Card: React.FC<Props> = ({ api }) => {
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
            src={api.main_image}
            onClick={hendlModal}
          />

          <LikeAndChart id={api.id}/>
        </div>

      <div className="card__header" onClick={hendlModal}>
        <div className="card__header--1">
          <h2 className="card__size">
            {languageReducer.language 
              ?('Size')
              :('Розмір')
            }
          </h2>
          <div className="card__size--img">
            <p className="card__size--img--1"/>
            <p className="card__size--img--2"/>
          </div>
          <p className="card__size--number">{`${api.height}/${api.width}`}</p>
        </div>

        <div className="card__header--2">
          <h1 className="card__name">
            {languageReducer.language 
              ?api.name_eng
              :api.name
            }
          </h1>
          <p className="card__price">{`$ ${api.price}`}</p>
        </div>
      </div>
    </div>

    {isSelect &&(<Modal card={api} hendlCloseModal={hendlModal}/>)}
  </>
  );
}