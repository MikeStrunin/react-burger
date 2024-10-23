import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { ingredientsReducer } from './reducers/ingredients';
import { orderReducer } from './reducers/order-details';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
});