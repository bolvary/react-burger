import { Dispatch } from 'react';
import { API_ADDRESS } from '../../constants';
export const STORE_NAME = 'ingredients';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';
export const LOAD_INGREDIENTS_PROCESS = 'LOAD_INGREDIENTS_PROCESS';
export const LOAD_INGREDIENTS_ERROR = 'LOAD_INGREDIENTS_ERROR';

export function getProducts(): Dispatch<any> {
    return (dispatch) => {
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
}
