import { TOrder } from "../../utils/types";
import { WebsocketStatus } from "./feed";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FeedStore = {
    status: WebsocketStatus;
    connectionError: string | null;
    orders: TOrder;
}

export const initialState: FeedStore = {
    status: WebsocketStatus.OFFLINE,
    orders: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    connectionError: null
}

export const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrder>) => {
            state.orders = action.payload;
        }
    },
    selectors: {
        getStatus: state => state.status,
        getorders: state => state.orders,
        getError: state => state.connectionError,
    }
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = feedSlice.actions;

export type WsActionCreators = typeof feedSlice.actions;

export type WsInternalActions = ReturnType<WsActionCreators[keyof WsActionCreators]>
export const { getStatus, getorders, getError } = feedSlice.selectors;