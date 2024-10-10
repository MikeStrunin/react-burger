import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { currentIngredientReducer } from './reducers/current-ingredient';
import { ingredientsReducer } from './reducers/ingredients';
import { orderReducer } from './reducers/order-details';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  currentIngredient: currentIngredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});