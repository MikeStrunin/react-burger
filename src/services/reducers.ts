import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './reducers/burger-constructor';
import { ingredientsReducer } from './reducers/ingredients';
import { orderReducer } from './reducers/order-details';
import { userReducer } from './reducers/user'
import { feedSlice } from './feed/slice';

export const rootReducer = combineReducers({
  feed: feedSlice.reducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
});