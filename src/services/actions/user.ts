import { TUserData, TUserLoginData } from "../../utils/types";
import {
    getUser as getUserApi,
    login as loginApi,
    logout as logoutApi,
    updateUser as updateUserApi
} from "../api";
import { AppDispatch } from "../hooks";

export const SET_AUTH_CHECKED: 'SET_AUTH_CHECKED' = "SET_AUTH_CHECKED";
export const SET_USER: 'SET_USER' = "SET_USER";

export interface ISetAuthUserAction {
    readonly type: typeof SET_AUTH_CHECKED;
    readonly payload: boolean;
}

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly payload: TUserData | null;
}
export type TUserActions = ISetAuthUserAction | ISetUserAction;

export const setAuthChecked = (value: boolean): ISetAuthUserAction => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user: TUserData | null): ISetUserAction => ({
    type: SET_USER,
    payload: user,
});

export const getUser = () => {
    return (dispatch: AppDispatch) => {
        return getUserApi().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const updateUser = (payload: TUserData) => {
    return (dispatch: AppDispatch) => {
        return updateUserApi(payload).then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const login = (payload: TUserLoginData) => {
    return (dispatch: AppDispatch) => {
        return loginApi(payload).then((res) => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res.user));
            dispatch(setAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = () => {
    return (dispatch: AppDispatch) => {
        return logoutApi().then(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
        });
    };
};
