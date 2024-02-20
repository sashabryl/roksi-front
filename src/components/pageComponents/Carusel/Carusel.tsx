import { useEffect, useState } from 'react';
import './Carusel.scss';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Cherwood } from '../../../helpers/Cherwood';
import { getCherwood } from '../../../api';

import imh from "../.././../img/homeee.jpg"
import { useAppSelector } from '../../../app/hooks';
import { Modal } from '../Modal/Modal';

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

export const CarouselOnPage = () => {
  const [cherwood, setCherwood] = useState<Cherwood[]>([]);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Cherwood | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const languageReducer = useAppSelector(state => state.language);
  const isMobile = window.innerWidth <= 640;

  const hendlModal = (item: Cherwood) => {
    setSelectedItem(item);
    setIsSelect(true);
  }
 
  useEffect(() => {
    getCherwood()
      .then((straviFromServer) => {
        setCherwood(straviFromServer);
        setIsLoading(false); // Set loading to false when data is fetched
      })
  }, []);

  return (
    <div className="carousel">
     {!isLoading && 
      <h2 className="carousel__title">
        {languageReducer.language 
          ?('Recommended products')
          :('Рекомендовані товари')
        }
      </h2>
      }

      {!isLoading && 
        <Slide {...arrowButtons} duration={5000} indicators={!isMobile}>
          {cherwood.map((photo) => (
            <div key={photo.id} className="each-slide">
              <img 
                src={imh} 
                className={`carousel__slide`} 
                alt={`Slide ${photo.id}`}
              />

              <button className='carousel__add' onClick={() => hendlModal(photo)}>
                {languageReducer.language 
                  ?('Add to cart +')
                  :('Додати до кошика +')
                }
              </button>
            </div>
          ))}
        </Slide>
      }

      {isSelect && selectedItem && (
        <Modal card={selectedItem} hendlCloseModal={() => setIsSelect(false)} key={selectedItem.id}/>
      )}
    </div>
  );
};