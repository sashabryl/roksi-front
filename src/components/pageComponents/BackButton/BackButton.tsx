import './BackButton.scss';
import { useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router';

type Props = {
  hendlCloseModal?: () => void; 
};

export const BackButton:React.FC<Props> = ({hendlCloseModal}) => {
  const languageReducer = useAppSelector(state => state.language);
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (hendlCloseModal) {
      hendlCloseModal()
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="backButton"
      onClick={handleGoBack}
      aria-hidden
      data-cy="backButton"
    >
      <div className="backButton__icon" />

      <span className="backButton__text">
        {
          languageReducer.language 
            ?('back')
            :('назад')
        }
      </span>
    </div>
  );
};
