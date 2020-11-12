import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  // blacklist: [
  //   'product',
  //   'category',
  // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger),
);

let persistor = persistStore(store);

export {store, persistor};
