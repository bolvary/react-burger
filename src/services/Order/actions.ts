import { API_ORDER_ADDRESS } from '../../constants';
import { getCookie } from '../../utils/coockie';
import { AppDispatch, AppThunk } from '../../utils/types';
import { CLEAR_ALL_INGREDIENTS } from '../ContructorIngridients/actions';

export const SET_ORDER_ID: 'SET_ORDER_ID' = 'SET_ORDER_ID';
export const REMOVE_ORDER_ID: 'REMOVE_ORDER_ID' = 'REMOVE_ORDER_ID';

export interface IRemoveOrderIdAction {
  readonly type: typeof REMOVE_ORDER_ID;
}

export interface ISetOrderIdAction {
  readonly type: typeof SET_ORDER_ID;
  payload: number;
}

export const setOrderId = (data: number): ISetOrderIdAction => ({
  type: SET_ORDER_ID,
  payload: data
});

export const deleteOrderModal = (): IRemoveOrderIdAction => ({
  type: REMOVE_ORDER_ID,
});

export type TOrderActions = 
  | IRemoveOrderIdAction
  | ISetOrderIdAction;

export const getOrder: AppThunk = (ids: { ingredients: string[] | any}) =>  (dispatch: AppDispatch) => {
      fetch(API_ORDER_ADDRESS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": getCookie('accessToken') || 'null'
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
          dispatch(setOrderId(data.order.number));
          dispatch({
            type: CLEAR_ALL_INGREDIENTS,
          });
        })
        .catch(err => alert(`Ой! Что-то пошло не так! ${err}`));
}
