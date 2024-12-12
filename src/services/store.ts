
import { compose, createStore, applyMiddleware } from 'redux';
import {
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen
} from "./feed/slice";

import { socketMiddleware } from './middleware/socket-middleware';
import { wsConnect, wsDisconnect } from './feed/actions';

import { rootReducer } from './reducers';
import { thunk } from 'redux-thunk';
import { TOrder } from '../utils/types';

const feedMiddleware = socketMiddleware<TOrder, unknown>({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage
});

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, feedMiddleware));

export const store = createStore(rootReducer, enhancer);