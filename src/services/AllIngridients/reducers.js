import {
    LOAD_INGREDIENTS,
    LOAD_INGREDIENTS_PROCESS,
    LOAD_INGREDIENTS_ERROR,
} from './actions';

const initialState = {
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
