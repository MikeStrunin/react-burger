import {
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { TBurgerItemsActions } from "./actions/burger-constructor";
import { TOrderDetailsActions } from "./actions/order-details";
import { TIngredientsActions } from "./actions/ingredients";
import { TUserActions } from "./actions/user";
import { WsInternalActions } from "./feed/slice";
import { WsExternalActions } from './feed/actions';
import { rootReducer } from './reducers';

export type TAppActions = TBurgerItemsActions | TOrderDetailsActions | TIngredientsActions | TUserActions | WsExternalActions | WsInternalActions;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();