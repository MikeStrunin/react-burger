import type { Identifier } from "dnd-core"

export type TIngredientItemType = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    key?: string;
}

export type TConstructorItem = {
    item: TIngredientItemType;
    index: string;
    id: string;
};

export type TDragObject = {
    id: string;
    index: string;
}

export type TDragCollectedProps = {
    isDragging: boolean;
    handlerId?: Identifier | null;
}

export type TDropCollectedProps = {
    handlerId: Identifier | null;
}

export type TDropCollectedIngredientProps = {
    canDropIngr: boolean;
    canDropBun: boolean;
    isOverIngr: boolean;
    isOverBun: boolean;
}