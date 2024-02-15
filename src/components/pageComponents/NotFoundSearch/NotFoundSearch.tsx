import { useSearchParams } from "react-router-dom";

import "./NotFoundSearch.scss";

export const NotFoundSearch = () => {
  const [searchQuery] = useSearchParams();
  const search = searchQuery.get('query')|| '';

  return (
    <div className="any">
      <p className="any__dandruff"/>

      <h1 className="any__found">{`No “${search}” found`}</h1>
      <h2 className="any__found--descr">
        We couldn't find any catalog matching your query. Try another query
      </h2>
    </div>
  );
}