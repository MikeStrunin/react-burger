const apiConfig = {
    baseUrl: "https://norma.nomoreparties.space/api",
    // headers: {
    //   Authorization: "Bearer bearererer",
    //   "Content-Type": "application/json",
    // },
};

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const request = (endpoint, options) => {
    return fetch(`${apiConfig.baseUrl + endpoint}`, options).then(getResponse)
}

export const getAllIngredientsRequest = () => request("/ingredients");

export const createOrderRequest = (ingredientsID) => {
    return request("/orders",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'ingredients': ingredientsID,
            }),
        });
}


export const passwordReset = (email) => {
    return request("/password-reset",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email
            }),
        });
}

export const passwordResetReset = (password) => {
    return request("/password-reset/reset",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "password": password,
                "token": ""//TODO:
            }),
        });
}

export const register = ({ email, password, name }) => {
    return request("/auth/register",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name,
            }),
        });
}

export const login = ({ email, password }) => {
    return request("/auth/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        });
}

export const token = (refreshToken) => {
    return request("/auth/token",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": refreshToken,
            }),
        });
}

//TODO: передать серверу токен из куков в поле authorization.
export const getUser = () => {
    return request("/auth/user",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     "token": refreshToken,
            // }),
        });
}

//TODO: передать серверу токен из куков в поле authorization.
export const updateUser = () => {
    return request("/auth/user",
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     "token": refreshToken,
            // }),
        });
}