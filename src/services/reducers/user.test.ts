import { userReducer, initialState } from './user';
import { expect, it } from '@jest/globals';
import { SET_AUTH_CHECKED, SET_USER, TUserActions } from '../actions/user';

describe('Redux reducer of User', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState)
    })

    it('should return state with setted isAuthChecked', () => {
        const isAuthChecked = true;
        expect(userReducer(undefined, { type: SET_AUTH_CHECKED, payload: isAuthChecked })).toEqual(
            { ...initialState, isAuthChecked }
        )
    })

    it('should return state with setted user', () => {
        const user = {
            name: "testUserName",
            email: "testEmail",
        };
        expect(userReducer(undefined, { type: SET_USER, payload: user })).toEqual(
            { ...initialState, user }
        )
    })
})