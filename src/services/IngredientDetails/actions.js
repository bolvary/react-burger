export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';
export const STORE_NAME = 'ingredientDetails';

export function setIngredientDetails(item) {
    return (dispatch) => {   
            dispatch({
                type: SET_INGREDIENT_DETAILS,
                payload: item,
            });
    }
}
