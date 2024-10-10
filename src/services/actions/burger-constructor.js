import { v4 } from "uuid";

export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const RESET_ITEMS = "RESET_ITEMS"
export const MOVE_ITEM = "MOVE_ITEM";

export const addItem = (item) => (dispatch) => {
    dispatch({
        type: ADD_ITEM_SUCCESS,
        item: { ...item, key: v4() },
    });
}

export const deleteItem = (item) => (dispatch) => {
    dispatch({
        type: DELETE_ITEM_SUCCESS,
        item: item,
    })
};

export const moveItem = (fromIndex, toIndex) => {
    return {
        type: MOVE_ITEM,
        fromIndex: fromIndex,
        toIndex: toIndex,
    };
};
