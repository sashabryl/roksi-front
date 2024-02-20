import { Cherwood } from "./helpers/Cherwood"; 
import cherwoodData from "../src/data (4).json";

import { Option } from "./helpers/Options";
import options from "../src/options.json";
import { UserType } from "./helpers/UserType";
import { CartItem } from "./helpers/ChartInterface";
import axios from "axios";
import { BookingItem } from "./helpers/BookingInterface";

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

// export async function getCherwood(): Promise<Cherwood[]> {
//   return wait(500)
//     .then(() => {
//       const jsonData = cherwoodData as Cherwood[];
//       return Promise.resolve(jsonData);
//     });
// } 

export async function getCherwood(): Promise<Cherwood[]> {
  const apiUrl = 'http://127.0.0.1:8000/api/products/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: Cherwood[]) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

export const LogOut = async (access) => {
  try {
    const data = {
      refresh: access,
    };

    const url = 'http://127.0.0.1:8000/api/user/logout/'; 
    await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  } 
};

export async function getChart(): Promise<CartItem> {
  const apiUrl = 'http://127.0.0.1:8000/api/cart/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: CartItem) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

export async function getUser(access): Promise<UserType> {
  const apiUrl = 'http://127.0.0.1:8000/api/user/me/';

  const accessToken = access;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers(headers),
  };

  return fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: UserType) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}

export async function getBooking(access): Promise<BookingItem[]> {
  const apiUrl = 'http://127.0.0.1:8000/api/user/orders/';

  const accessToken = access;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers(headers),
  };

  return fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: BookingItem[]) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
    });
}



export async function getOptions(): Promise<Option[]> {
  return wait(500)
    .then(() => {
      const jsonData2 = options as Option[];
      return Promise.resolve(jsonData2);
    });
}

export const handleChart = async (currentAction: string, id: number) => {
  try {
    const data = {
      product_id: id,
      action: currentAction,
    };

    const url = 'http://127.0.0.1:8000/api/cart/';

    await axios.post(url, data);
  } catch (error) {
    console.log(error);
  }
};
