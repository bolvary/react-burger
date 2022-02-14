import { STORE_NAME } from './actions';
import { RootState } from '../../utils/types';

export const getIngredientDetails = (store: RootState) => store[STORE_NAME].ingredientDetails;
