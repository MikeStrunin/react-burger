import {
    getUser as getUserApi,
    login as loginApi,
    logout as logoutApi,
    updateUser as updateUserApi
} from "../api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const getUser = () => {
    return (dispatch) => {
        return getUserApi().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const updateUser = (payload) => {
    console.log("payload=" + payload.name)
    return (dispatch) => {
        return updateUserApi(payload).then((res) => {
            console.log("res.user.name=" + res.user.name)
            dispatch(setUser(res.user));
        });
    };
};

export const login = (payload) => {
    return (dispatch) => {
        return loginApi(payload).then((res) => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            dispatch(setUser(res.user));
            dispatch(setAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
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
    return (dispatch) => {
        return logoutApi().then(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
        });
    };
};
