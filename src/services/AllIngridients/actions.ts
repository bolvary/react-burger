import { API_ADDRESS } from '../../constants';
import { AppDispatch, AppThunk, TIngridientData } from '../../utils/types';
export const STORE_NAME = 'ingredients';

export const LOAD_INGREDIENTS: 'LOAD_INGREDIENTS' = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_PROCESS: 'LOAD_INGREDIENTS_PROCESS' = 'LOAD_INGREDIENTS_PROCESS';
export const LOAD_INGREDIENTS_ERROR: 'LOAD_INGREDIENTS_ERROR' = 'LOAD_INGREDIENTS_ERROR';

export interface ILoadIngredientsAction {
    readonly type: typeof LOAD_INGREDIENTS;
    readonly payload: Array<TIngridientData>;
}

export interface ILoadIngredientsProcessAction {
    readonly type: typeof LOAD_INGREDIENTS_PROCESS;
}

export interface ILoadIngredientsErrorAction {
    readonly type: typeof LOAD_INGREDIENTS_ERROR;
}

export type TLoadIngredientsActions = 
    | ILoadIngredientsAction
    | ILoadIngredientsErrorAction
    | ILoadIngredientsErrorAction;

export const getProducts: AppThunk = () => (dispatch: AppDispatch) => {
    fetch(`${API_ADDRESS}/ingredients`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response.status);
        })
        .then(data => {
            dispatch({
                type: LOAD_INGREDIENTS_PROCESS,
            });
            if (data && data.success) {
                dispatch({
                    type: LOAD_INGREDIENTS,
                    data: data.data,
                });
            }
        })
        .catch((error) => {
            console.log('error', error);
            dispatch({
                type: LOAD_INGREDIENTS_ERROR,
            });
        });
}
