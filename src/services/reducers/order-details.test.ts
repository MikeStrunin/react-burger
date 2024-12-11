import { expect, it } from '@jest/globals';
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    RESET_ORDER,
    RESET_ORDER_ERROR,
    TOrderDetailsActions
} from '../actions/order-details';
import { orderReducer, initialState } from './order-details';

describe('Redux reducer of order-details', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {} as TOrderDetailsActions)).toEqual(initialState)
    })

    it('should return state with created request', () => {
        expect(orderReducer(undefined, { type: CREATE_ORDER_REQUEST })).toEqual(
            { ...initialState, orderRequest: true, orderError: null }
        )
    })

    it('should return state with successed create fields', () => {
        const orderNum = 13;
        const successedFields = {
            orderRequest: false,
            orderError: null,
            order: orderNum,
        };
        expect(orderReducer(undefined, { type: CREATE_ORDER_SUCCESS, orderNum })).toEqual(
            { ...initialState, ...successedFields }
        )
    })


    it('should return state with successed request fields', () => {
        const errorText = "testErrorText";
        expect(orderReducer(undefined, { type: CREATE_ORDER_ERROR, errorText })).toEqual(
            { ...initialState, orderError: errorText }
        )
    })


    it('should return state with reset order', () => {
        expect(orderReducer(undefined, { type: RESET_ORDER })).toEqual(
            { ...initialState, order: null }
        )
    })

    it('should return state with reset orderError', () => {
        expect(orderReducer(undefined, { type: RESET_ORDER_ERROR })).toEqual(
            { ...initialState, orderError: null }
        )
    })
})