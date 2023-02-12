import axios from 'axios';
import {GET_DATA, IS_LOGGED} from '../types';

export const isLoggedIn = (name: string) => {
  return {
    type: IS_LOGGED,
    payload: {name},
  };
};

export const cartItemsData = (data: any) => {
  return {
    type: GET_DATA,
    payload: data,
  };
};
