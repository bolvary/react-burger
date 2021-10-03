import { API_ADDRESS } from '../../constants';

export const LOAD_INGREDIENTS = 'LOAD_INGREDIENTS';

export function getProducts() {
    return function (dispatch) {
        fetch(API_ADDRESS)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response.status);
        })
        .then(data => {
        dispatch({
            type: LOAD_INGREDIENTS,
            data: data.data,
        });
        })
        .catch(err => alert(`Ой! Что-то пошло не так! ${err}`));
    }
}
