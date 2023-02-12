import {GET_DATA, IS_LOGGED} from '../types';

const initialState = {
  uid: null,
  cartArray: [],
};

export default function CartItemsReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_LOGGED:
      console.log('isLoggedInStatus', action.payload?.name);
      return {
        ...state,
        uid: action.payload?.name,
      };
    case GET_DATA:
      console.log('cartArray', action.payload);
      return {
        ...state,
        cartArray: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
