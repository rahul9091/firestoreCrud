import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItemsReducer from './reducer/CartItemsReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['uid'],
};

const rootReducer = combineReducers({
  cartReducer: persistReducer(persistConfig, CartItemsReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
