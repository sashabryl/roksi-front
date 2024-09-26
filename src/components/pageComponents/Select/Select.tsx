import { useEffect, useState } from "react";
import "./Select.scss";
import { getOptions } from "../../../helpers/api";
import { useAppSelector } from "../../../app/hooks";
import { useSearchParams } from "react-router-dom";


export const Select = () => {
  const [option, setOption] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const languageReducer = useAppSelector(state => state.language);

  useEffect(() => {
    getOptions()
      .then((straviFromServer) => {
        setOption(straviFromServer);

        if (straviFromServer.length > 0) {
          setSelectedItems([straviFromServer[0]]);
          setSearchQuery({ name: languageReducer.language ? straviFromServer[0].name_eng : straviFromServer[0].name });
        }
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectClick = (item: any) => {
    setSelectedItems([item]);
  };

  const handleViewAllClick = () => {
    setSelectedItems([...option]);
  };

  useEffect(() => {
    setSearchQuery({
       name: selectedItems.map(item => item.name_eng).join(', ')});
  }, [selectedItems]);

  return (
    <>
      <div className="select">
        {option.map((item) => (
          <button 
            key={item.id}
            className={selectedItems.some(selectedItem => selectedItem.id === item.id) ? "select__container select__container--selected" : "select__container"}
            onClick={() => handleSelectClick(item)}
          >
            {languageReducer.language ? item.name_eng : item.name}
          </button>
        ))}
      </div>

      {windowWidth > 780 && (
        <div 
          className="main__defolt" 
          onClick={handleViewAllClick}
        >
          {languageReducer.language 
            ? ('View all')
            : ('Усі')
          }
        </div>
      )}
    </>
  );
};