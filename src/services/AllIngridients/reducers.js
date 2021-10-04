import { LOAD_INGREDIENTS } from './actions';

const initialState = {
    ingredients: [],
};

export const allIngredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.data,
            }
        }
        default: {
            return state;
        }
    }
};
