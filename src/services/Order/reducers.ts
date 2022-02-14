import { SET_ORDER_ID, REMOVE_ORDER_ID, TOrderActions } from './actions';

type TOrderState = {
  orderId: number | null;
}

const initialState: TOrderState = {
  orderId: null,
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
