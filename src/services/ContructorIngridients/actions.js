import { v4 as uuidv4 } from 'uuid';

export const ADD_BUNS = 'ADD_BUNS';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const REMOVE_BUNS = 'REMOVE_BUNS';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const CLEAR_ALL_INGREDIENTS = 'CLEAR_ALL_INGREDIENTS';
export const CHANGE_INGREDIENTS = 'CHANGE_INGREDIENTS';

export function addBuns(item) {
    return (dispath) => {
        dispath({
            type: ADD_BUNS,
            payload: item,
        })
    }
}

export function addIngredients (item) {
    return (dispath) => {
        dispath({
            type: ADD_INGREDIENTS,
            payload: item,
            uuid: uuidv4(),
        })
    }
}
