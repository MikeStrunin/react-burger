import { expect, it } from '@jest/globals';
import { ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS, MOVE_ITEM, RESET_ITEMS, TBurgerItemsActions } from "../actions/burger-constructor";

import { burgerConstructorReducer, initialState } from './burger-constructor';
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

describe('Redux reducer of burgerConstructor', () => {
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {} as TBurgerItemsActions)).toEqual(initialState)
    })

    it('should return state with added item', () => {
        let isBun = testItem.type === 'bun';
        expect(burgerConstructorReducer(undefined, { type: ADD_ITEM_SUCCESS, item: testItem })).toEqual(
            {
                ...initialState,
                bun: isBun ? testItem : initialState.bun,
                ingredients: isBun ? initialState.ingredients : [...initialState.ingredients, testItem],
            }
        )
    })

    it('should return state without deleted item', () => {
        let isBun = testItem.type === 'bun';

        expect(burgerConstructorReducer({
            ...initialState,
            ingredients: [testItem, { ...testItem, _id: v4() }] // 'to be removed' and second elements
        }, { type: DELETE_ITEM_SUCCESS, item: testItem })).toEqual(
            {
                ...initialState,
                bun: isBun ? null : initialState.bun,
                ingredients: isBun ? initialState.ingredients : initialState.ingredients.filter(ingredient => ingredient.key !== testItem.key)
            }
        )
    })

    it('should return state moved', () => {
        const fromIndex = 0;
        const toIndex = 2;
        const initIngredients = [testItem, { ...testItem, _id: v4() }, { ...testItem, _id: v4() }]
        const ingredientsTmp = [...initIngredients];
        ingredientsTmp.splice(toIndex, 0, ingredientsTmp.splice(fromIndex, 1)[0]);

        expect(burgerConstructorReducer({ ...initialState, ingredients: [...initIngredients] },
            { type: MOVE_ITEM, fromIndex: fromIndex, toIndex: toIndex })).toEqual(
                { ...initialState, ingredients: ingredientsTmp }
            )
    })

    it('should return state resetet', () => {
        expect(burgerConstructorReducer(undefined, { type: RESET_ITEMS })).toEqual(
            { ...initialState, bun: null, ingredients: [] }
        )
    })
})