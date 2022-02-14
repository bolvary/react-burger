import { TIngridientData } from '../../utils/types';
import { SET_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS, TIngredientDetailsActions } from './actions';

type TIngredientDetails = {
  ingredientDetails: TIngridientData | null,
}

const initialState: TIngredientDetails = {
  ingredientDetails: null,
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): TIngredientDetails => {
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
