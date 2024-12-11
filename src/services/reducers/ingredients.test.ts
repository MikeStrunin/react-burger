import { expect, it } from '@jest/globals';
import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_ERROR,
    TIngredientsActions,
} from '../actions/ingredients';
import { ingredientsReducer, initialState } from './ingredients';
import { TIngredientItemType } from '../../utils/types';
import { v4 } from 'uuid';

const testItem: TIngredientItemType = {
    _id: v4(),
    name: 'testName;',
    type: 'main;',
    proteins: 123,
    fat: 123,
    carbohydrates: 123,
    calories: 123,
    price: 123,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    __v: 333
};

describe('Redux reducer of ingredients', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {} as TIngredientsActions)).toEqual(initialState)
    })

    it('should return state with created request', () => {
        expect(ingredientsReducer(undefined, { type: GET_ITEMS_REQUEST })).toEqual(
            { ...initialState, itemsRequest: true }
        )
    })

    it('should return state with successed create fields', () => {
        const testItems: Array<TIngredientItemType> = [
            testItem,
            { ...testItem, _id: v4() },
            { ...testItem, _id: v4() }
        ];
        const successedFields = {
            itemsError: false,
            items: testItems,
            itemsRequest: false,
            ingredientsMap: new Map(testItems.map(i => [i._id, i]))
        };
        expect(ingredientsReducer(undefined, { type: GET_ITEMS_SUCCESS, items: testItems })).toEqual(
            { ...initialState, ...successedFields }
        )
    })


    it('should return state with error', () => {
        const errorText = "testErrorText";
        expect(ingredientsReducer(undefined, { type: GET_ITEMS_ERROR, requestError: errorText })).toEqual(
            { ...initialState, itemsError: errorText, itemsRequest: false }
        )
    })

})