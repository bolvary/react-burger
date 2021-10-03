import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from './actions';

const initialState = {
  ingredientDetails: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: action.payload,
        };
      }
      case REMOVE_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: null,
        };
      }
      default: {
        return state;
      }
    }
};
