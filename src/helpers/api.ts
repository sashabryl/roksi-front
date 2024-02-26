import { Cherwood } from "./Cherwood"; 

import { Option } from "./Options";
import { UserType } from "./UserType";
import { CartItem } from "./ChartInterface";
import axios from "axios";
import { BookingItem } from "./BookingInterface";
import { useAppSelector } from "../app/hooks";
import { store } from "../app/store";

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


export async function getUser(access: string): Promise<UserType | undefined> {
  const apiUrl = 'http://127.0.0.1:8000/api/user/me/';
  const headers = {
    Authorize: `Bearer ${access}`,
  };

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: new Headers(headers),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const jsonData: UserType = await response.json();

    console.log(jsonData.detail )

    // if (jsonData.detail === 'Authentication credentials were not provided.') {
    //   const registrationState = store.getState().registration;

    //   registrationState.registration.access = '';
    //   registrationState.registration.refresh = '';

    //   console.log('delete');
    // } 
    return jsonData;
  } catch (error: any) {
    console.log('error')
  }
}


export async function getBooking(access): Promise<BookingItem[]> {
  const apiUrl = 'http://127.0.0.1:8000/api/order/orders/';

  const accessToken = access;

  const headers = {
    Authorize: `Bearer ${accessToken}`,
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
  const apiUrl = 'http://127.0.0.1:8000/api/categories/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: Option[]) => {
      return Promise.resolve(jsonData);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(error);
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
