import { v4 as uuidv4 } from 'uuid';
import { TIngridientData, TMovedIngredientsIndex } from '../../utils/types';

export const ADD_BUNS: 'ADD_BUNS' = 'ADD_BUNS';
export const ADD_INGREDIENTS: 'ADD_INGREDIENTS' = 'ADD_INGREDIENTS';
export const REMOVE_BUNS: 'REMOVE_BUNS' = 'REMOVE_BUNS';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const CLEAR_ALL_INGREDIENTS: 'CLEAR_ALL_INGREDIENTS' = 'CLEAR_ALL_INGREDIENTS';
export const CHANGE_INGREDIENTS: 'CHANGE_INGREDIENTS' = 'CHANGE_INGREDIENTS';

export interface IAddBunsAction {
    readonly type: typeof ADD_BUNS;
    readonly payload: TIngridientData;
}

export interface IAddIngredientsAction {
    readonly type: typeof ADD_INGREDIENTS;
    readonly payload: TIngridientData;
    readonly uuid: number;
}

export interface IClearAllIngredientsAction {
    readonly type: typeof CLEAR_ALL_INGREDIENTS;
}

export interface IRemoveBunsActions {
    readonly type: typeof REMOVE_BUNS;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly payload: number;
}

export interface IChangeIngredients {
    readonly type: typeof CHANGE_INGREDIENTS;
    readonly payload: TMovedIngredientsIndex;
}

export type TConstructorIngridientsActions =
    | IAddBunsAction
    | IAddIngredientsAction
    | IClearAllIngredientsAction
    | IRemoveBunsActions
    | IRemoveIngredientAction
    | IChangeIngredients;

export const addBuns = (item: TIngridientData): TConstructorIngridientsActions => ({
        type: ADD_BUNS,
        payload: item,
});

export const addIngredients = (item: TIngridientData): TConstructorIngridientsActions => ({
        type: ADD_INGREDIENTS,
        payload: item,
        uuid: uuidv4(),
});
