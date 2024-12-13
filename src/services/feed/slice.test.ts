import { expect, it } from '@jest/globals';
import {
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen
} from "./slice";
//import {login} from "../store/auth/actions";
import { feedSlice, initialState } from './slice';
import { WebsocketStatus } from './feed';


describe('Redux store and actions', () => {
    it('should return the initial state', () => {
        expect(feedSlice.reducer(undefined, { type: "" })).toEqual(initialState)
    })

    it('should return state with ws status=CONNECTING', () => {
        expect(feedSlice.reducer(initialState, { type: wsConnecting.type })).toEqual(
            { ...initialState, status: WebsocketStatus.CONNECTING }
        )
    })

    it('should return state with ws status=ONLINE', () => {
        expect(feedSlice.reducer(initialState, { type: wsOpen.type })).toEqual(
            { ...initialState, status: WebsocketStatus.ONLINE }
        )
    })

    it('should return state with ws status=OFFLINE', () => {
        expect(feedSlice.reducer(initialState, { type: wsClose.type })).toEqual(
            { ...initialState, status: WebsocketStatus.OFFLINE }
        )
    })

    it('should return state with connectionError', () => {
        const wsConnectionError = "errTest"
        expect(feedSlice.reducer(initialState, { type: wsError.type, payload: wsConnectionError })).toEqual(
            { ...initialState, connectionError: wsConnectionError }
        )
    })

    it('should return state with setted data', () => {
        const testOrders = {
            success: false,
            orders: [],
            total: 1,
            totalToday: 2
        }

        expect(feedSlice.reducer(initialState, { type: wsMessage.type, payload: testOrders })).toEqual(
            { ...initialState, orders: testOrders }
        )
    })
})