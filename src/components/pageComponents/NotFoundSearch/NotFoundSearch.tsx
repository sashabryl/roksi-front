import { useAppSelector } from "../../../app/hooks";
import "./NotFoundSearch.scss";

export const NotFoundSearch = () => {
  const languageReducer = useAppSelector((state) => state.language);

  return (
    <div className="any">
      <p className="any__dandruff"/>

      <h1 className="any__found">
       {languageReducer.language
          ? 'Not found'
          : 'Не знайдено'
        }
        </h1>
      <h2 className="any__found--descr">
        {languageReducer.language
          ? 'We couldn\'t find any catalog. '
          : 'Ми не змогли знайти жодного каталогу.'
        }
      </h2>
    </div>
  );
}