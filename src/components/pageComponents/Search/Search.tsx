import { useSearchParams } from "react-router-dom";
import "./Search.scss";
import { useAppSelector } from "../../../app/hooks";
import { getSearchWith } from "../../../helpers/helpers";
import classNames from "classnames";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const languageReducer = useAppSelector(state => state.language);

  const query = searchQuery.get('query') || '';

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(getSearchWith(searchQuery,
      { query: event.target.value || null }));
  };

  const isClearSearch = () => {
    setSearchQuery('');
    setSearchQuery(getSearchWith(searchQuery,
      { query: null }
    ));
  };

  const formInput = document.querySelector('.form__input');
  const form = document.querySelector('.form');

  if (form !== null  && formInput !== null) {
  formInput.addEventListener('focus', function() {
    form.classList.add('focused');
    });

    formInput.addEventListener('blur', function() {
    form.classList.remove('focused');
    });
  }

  return (
    <div className="form">
      <label
        className="form__label"
        htmlFor="searchInput"
      >
      <button
        type="button"
        className={classNames('form__img',
          query
            ? 'form__cross'
            : 'form__search')}
        onClick={isClearSearch}
      />
        <input
          type="text"
          className="form__input"
          value={query}
          placeholder= {
            languageReducer.language 
              ?('Search')
              :('Пошук')
          }
          onChange={onQueryChange}
        />
      </label>
    </div>
  );
};