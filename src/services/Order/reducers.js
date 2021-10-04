import { SET_ORDER_ID, REMOVE_ORDER_ID } from './actions';

const initialState = {
  orderId: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ORDER_ID: {
        return {
          ...state,
          orderId: action.payload,
        };
      }
      case REMOVE_ORDER_ID: {
        return {
          ...state,
          orderId: null,
        };
      }
      default: {
        return state;
      }
    }
};
