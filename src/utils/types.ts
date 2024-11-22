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

export type TTokenData = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
}

export type TUserData = {
    name: string;
    email: string;
    password?: string;
}

export type TUserPasswordResetData = Pick<TUserData, "email">

export type TUserPasswordResetResetData = Required<Pick<TUserData, "password">> & { code: string }

export type TUserRegisterData = Required<TUserData>

export type TUserLoginData = Required<Pick<TUserData, "email" | "password">>

export type TIngredientsResponse = {
    success: boolean;
    data: Array<TIngredientItemType>
}

export type TResetPasswordResponse = {
    success: boolean;
    message: string
}

export type TRegisterResponse = {
    success: boolean;
    user: {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}

export type TLogoutResponse = {
    success: boolean;
    message: string
}

export type TCreateOrderResponse = {
    success: boolean;
    name: string,
    order: {
        number: number
    },
}

export type TAuthUserResponse = {
    success: boolean;
    user: {
        email: string,
        name: string
    },
}

