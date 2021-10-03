import { API_ORDER_ADDRESS } from '../../constants';
import { CLEAR_ALL_INGREDIENTS } from '../ContructorIngridients/actions';

export const SET_ORDER_ID = 'SET_ORDER_ID';
export const REMOVE_ORDER_ID = 'REMOVE_ORDER_ID';

export function getOrder(ids) {
    return function (dispatch) {
        fetch(API_ORDER_ADDRESS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(response.status);
          })
          .then(data => {
            dispatch({
              type: SET_ORDER_ID,
              payload: data.order.number,
            });
            dispatch({
              type: CLEAR_ALL_INGREDIENTS,
            });
          })
          .catch(err => alert(`Ой! Что-то пошло не так! ${err}`));
    }
}
