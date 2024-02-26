import { Cherwood } from "./Cherwood"; 

import { Option } from "./Options";
import { UserType } from "./UserType";
import { CartItem } from "./ChartInterface";
import axios from "axios";
import { BookingItem } from "./BookingInterface";
import { store } from "../app/store";


// export async function getCherwood(): Promise<Cherwood[]> {
//   return wait(500)
//     .then(() => {
//       const jsonData = cherwoodData as Cherwood[];
//       return Promise.resolve(jsonData);
//     });
// } 

export async function getCherwood(): Promise<Cherwood[] | undefined> {
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
      return undefined;
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

    const registrationState = store.getState().registration;

    registrationState.registration.access = '';
    registrationState.registration.refresh = '';

    window.location.reload();
  } catch (error) {
    console.log(error);
  } 
};

export async function getChart(): Promise<CartItem | undefined> {
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
      return undefined;
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

    if (jsonData.detail === 'Given token not valid for any token type') {
      const refreshToken = store.getState().registration.registration.refresh;

      const refreshUrl = 'http://127.0.0.1:8000/api/user/token-refresh/';

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
            const registrationState = store.getState().registration;

            console.log('Token is invalid or expired')

            registrationState.registration.access = '';
            registrationState.registration.refresh = '';
            throw new Error('Token is invalid or expired');
          } else {
            const registrationState = store.getState().registration;
            registrationState.registration.access = jsonData.access
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
      return undefined;
    });
}


export async function getOptions(): Promise<Option[] | undefined> {
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
      return undefined;
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
