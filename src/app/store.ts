import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import LanguageSlice from './slice/LanguageSlice';
import RegistrationSlice from './slice/RegistrSlice';
import ChartSlice from './slice/ChartSlice';

const persistConfig = {
  key: 'cherwood',
  storage,
  whitelist: ['language', 'registration', 'chart'],
};

const rootReducer = combineReducers({
  language: LanguageSlice,
  registration: RegistrationSlice,
  chart: ChartSlice,
});

const usersReducer = persistReducer(persistConfig, rootReducer);
 
export const store = configureStore({
  reducer: usersReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

