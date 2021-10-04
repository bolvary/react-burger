import { combineReducers } from 'redux';
import { allIngredientReducer } from '../services/AllIngridients/reducers';
import { ingredientDetailsReducer } from './IngredientDetails/reducers';
import { orderReducer } from './Order/reducers';
import { selectedIngredientsReducer } from './ContructorIngridients/reducers';

export const rootReducer = combineReducers({
    ingredients: allIngredientReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    selectedIngredients: selectedIngredientsReducer,
});
