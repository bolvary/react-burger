import { TIngridientData } from '../../utils/types';
import {
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_PROCESS,
    LOAD_INGREDIENTS_ERROR,
} from './actions';

type TAllIngredient = {
    ingredients: TIngridientData[],
    ingredientsIsLoaded: boolean,
    ingredientsLoadedError: boolean,
}

const initialState: TAllIngredient = {
    ingredients: [],
    ingredientsIsLoaded: false,
    ingredientsLoadedError: false,
};

export const allIngredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.data,
                ingredientsIsLoaded: true,
            }
        }
        case LOAD_INGREDIENTS_PROCESS: {
            return {
                ...state,
                ingredientsIsLoaded: false,
            }
        }

        case LOAD_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsLoadedError: true,
            }
        }

        default: {
            return state;
        }
    }
};
