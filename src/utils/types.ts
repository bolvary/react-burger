import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { Location } from 'history';

import store from '../services/store';
import { TIngredientDetailsActions } from '../services/IngredientDetails/actions';
import { TOrderActions } from '../services/Order/actions';
import { TConstructorIngridientsActions } from '../services/ContructorIngridients/actions';
import { TAuthActions } from '../services/Auth/actions';
import { TLoadIngredientsActions } from '../services/AllIngridients/actions';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type TApplicationActions =
  | TIngredientDetailsActions
  | TOrderActions
  | TConstructorIngridientsActions
  | TAuthActions
  | TLoadIngredientsActions;

export type TIngridientData = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    index?: number;
    key?: string;
    uuid?: number;
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TErrorMassage = {
    error: string;
}

export type TUserData = TLoginData & {
    name: string;
};

export type TUserDataWithoutPass = {
    name: string;
    email: string;
}

export type TMovedIngredientsIndex = {
    fromIndex: number,
    toIndex: number
};

export type TLocation = {
    modal?: Location
} 

export type TParams = {
    id: string
}

export type TOrderCard = {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}
  
export type IOrdersInfo = {
    total: number;
    totalToday: number;
    orders: Array<TOrderCard>
}

export type TOrder = {
    orderInfo: TOrderCard;
}
