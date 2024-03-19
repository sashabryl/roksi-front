import { ApiInterface } from "./ApiInterface"; 

import { Option } from "./Options";
import { UserType } from "./UserType";
import { CartItem } from "./ChartInterface";
import axios from "axios";
import { BookingItem } from "./BookingInterface";
import { store } from "../app/store";
import { addRegistrationAction } from "../app/slice/RegistrSlice";

export async function getApi(): Promise<ApiInterface[]> {
  const apiUrl = 'https://roksi-back.fly.dev/api/products/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${apiUrl}`);
      }
      return response.json();
    })
    .then((jsonData: ApiInterface[]) => {
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

    const url = 'https://roksi-back.fly.dev/api/user/logout/';
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
  const apiUrl = 'https://roksi-back.fly.dev/api/cart/';

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


export async function getUser(access: string, dispatch): Promise<UserType | undefined> {
  const apiUrl = 'https://roksi-back.fly.dev/api/user/me/';
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

    if (jsonData.detail === 'Given token not valid for any token type') {
      const refreshToken = store.getState().registration.registration.refresh;

      const refreshUrl = 'https://roksi-back.fly.dev/api/user/token-refresh/';

      const refreshHeaders = {
        Authorization: `Bearer ${refreshToken}`,
      };

      const refreshRequestOptions: RequestInit = {
        method: 'POST',
        headers: {
          ...refreshHeaders,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ refresh: refreshToken }),
      };

      return fetch(refreshUrl, refreshRequestOptions)
        .then(response => {
          return response.json();
        })
        .then((jsonData) => {
          console.log(jsonData)
          if (jsonData.detail === 'Token is invalid or expired') {
            dispatch( addRegistrationAction({ access: '', refresh: '' }));
          } else {
            dispatch( addRegistrationAction({ access: jsonData.access}));
          }
          return Promise.resolve(jsonData);
        })
        .catch(error => {
          return undefined;
        });
    } 
    return jsonData;
    
  } catch (error: any) {
    return undefined;
  }
}

export async function getBooking(access): Promise<BookingItem[] | undefined> {
  const apiUrl = 'https://roksi-back.fly.dev/api/orders/';

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
      return jsonData;
    })
    .catch(error => {
      console.error(error);
      return undefined; 
    });
}

export async function getOptions(): Promise<Option[]> {
  const apiUrl = 'https://roksi-back.fly.dev/api/categories/';

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

    const url = 'https://roksi-back.fly.dev/api/cart/';

    await axios.post(url, data);
  } catch (error) {
    console.log(error);
  }
};
