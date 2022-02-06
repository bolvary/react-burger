import { TIngridientData } from "../../utils/types";

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS: 'REMOVE_INGREDIENT_DETAILS' = 'REMOVE_INGREDIENT_DETAILS';
export const STORE_NAME: string = 'ingredientDetails';

export interface ISetIngredientDetailsAction {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly payload: TIngridientData;
}

export interface IRemoveIngredientDetailsAction {
    readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = 
    | ISetIngredientDetailsAction
    | IRemoveIngredientDetailsAction;

export const setIngredientDetails = (item: TIngridientData): ISetIngredientDetailsAction => ({
    type: SET_INGREDIENT_DETAILS,
    payload: item,
});

export const RemoveIngredientDetails = (): IRemoveIngredientDetailsAction => ({
    type: REMOVE_INGREDIENT_DETAILS
});
