import { STORE_NAME } from './actions';
import { RootState } from '../../utils/types';

export const getAllIngredients = (store: RootState) => store[STORE_NAME].ingredients;
