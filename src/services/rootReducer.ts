import { combineReducers } from 'redux';
import { allIngredientReducer } from '../services/AllIngridients/reducers';
import { ingredientDetailsReducer } from './IngredientDetails/reducers';
import { orderReducer } from './Order/reducers';
import { selectedIngredientsReducer } from './ContructorIngridients/reducers';
import { auth } from './Auth/reducers';
import { websocketReducer } from './Websocket/reducer';

export const rootReducer = combineReducers({
    ingredients: allIngredientReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: orderReducer,
    selectedIngredients: selectedIngredientsReducer,
    auth: auth,
    websocket: websocketReducer,
});
