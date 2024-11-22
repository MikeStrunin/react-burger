import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from './store';
import { TBurgerItemsActions } from "./actions/burger-constructor";
import { TOrderDetailsActions } from "./actions/order-details";
import { TIngredientsActions } from "./actions/ingredients";
import { TUserActions } from "./actions/user";

export type TAppActions = TBurgerItemsActions | TOrderDetailsActions | TIngredientsActions | TUserActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;