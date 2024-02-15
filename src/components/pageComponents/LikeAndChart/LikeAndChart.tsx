import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { getChart, getUser } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UserType } from "../../../helpers/UserType";
import { CartItem } from "../../../helpers/ChartInterface";
import { changeChartAction } from "../../../app/slice/ChartSlice";

type Props = {
  id: number,
  noAbsolute?: boolean,
}

export const LikeAndChart: React.FC<Props> = ({id, noAbsolute}) => {
  const [user, setUser] = useState<UserType | undefined>();
  const [isLike, setIsLike] = useState(false);
  const [isInChart, setIsInChart] = useState<CartItem>({ products: [], cart_total_price: 0 });
  const registrationReducer = useAppSelector(state => state.registration);
  const currentChartState = useAppSelector((state) => state.chart.chart);
  const dispatch = useAppDispatch();

useEffect(() => {
  if (registrationReducer.registration.access 
    || registrationReducer.registration.refresh
    ) {
    getUser(registrationReducer.registration.access 
      || registrationReducer.registration.refresh
      )
    .then((userFromServer) => {
      setUser(userFromServer)
    })
  }
}, [isLike]);

useEffect(() => {
    getChart()
    .then((chartData) => {
      setIsInChart(chartData);
    })
    .catch((error) => {
      console.error(error);
    });
}, [currentChartState]);

  const handleLike = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            registrationReducer.registration.access 
            || registrationReducer.registration.refresh
          }`
        }
      };
  
      const url = `http://127.0.0.1:8000/api/products/${id}/favourite/`;
      await axios.post(url, null, config);
      setIsLike(!isLike)
    } catch (error) {
      console.log(error);
    } 
  };

const handleChart = async () => {
  try {
    const currentAction = inChart ? 'remove' : 'add';

    const data = {
      product_id: id,
      action: currentAction,
    };

    const url = 'http://127.0.0.1:8000/api/cart/';

    await axios.post(url, data);

    dispatch(changeChartAction(!currentChartState));
  } catch (error) {
    console.log(error);
  }
};

let inChart = false;

if (isInChart.products.length > 0) {
  inChart = isInChart.products.some(((product) => product.id === id)
  );
}

  return (
    <div className="card__minicontainer">
      <button 
        className={classNames("card__notLike", {
          'card__like': user && user.favourites.includes(id),
          'card__noAbsolute' : noAbsolute,
        })} 
        onClick={handleLike}
      />
      <button className={classNames("card__chart--cont", {
          'card__chart--cont--select': inChart,
          'card__noAbsolute' : noAbsolute,
        })} 
        onClick={handleChart}
      >
        <div 
          className="card__chart"
        />
      </button>
  </div>
  );
}