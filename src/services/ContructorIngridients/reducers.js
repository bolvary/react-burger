import { ADD_BUNS, ADD_INGREDIENTS, REMOVE_BUNS, REMOVE_INGREDIENT, CLEAR_ALL_INGREDIENTS, CHANGE_INGREDIENTS } from './actions';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    buns: null,
    selectedIngredients: [],
  };

  export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_ALL_INGREDIENTS: {
        return {
            bun: null,
            selectedIngredients: [],
        };
        }
        case ADD_BUNS: {
            return {
                ...state,
                buns: action.payload
            }
        }
        case REMOVE_BUNS: {
            return {
                ...state,
                buns: null
            }
        }
        case ADD_INGREDIENTS: {
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, {...action.payload, uuid: uuidv4()}]
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                selectedIngredients: state.selectedIngredients.filter((item) => item.uuid !== action.payload)
            }
        }
        case CHANGE_INGREDIENTS : {
            const ingredients = [...state.selectedIngredients];
            ingredients.splice(action.payload.toIndex, 0, ingredients.splice(action.payload.fromIndex, 1)[0]);

            return {
                ...state,
                selectedIngredients: ingredients
            }
        }
        default: {
            return state;
        }
    }
};
