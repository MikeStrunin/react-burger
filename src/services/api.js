const BURGER_API_URL = "https://norma.nomoreparties.space/api"

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));  // ранее- return Promise.reject(`Ошибка ${res.status}`);
};

const fetchNoRefresh = (endpoint, options) => {
    return fetch(`${BURGER_API_URL + endpoint}`, options).then(checkReponse)
}

export const getAllIngredientsRequest = () => fetchNoRefresh("/ingredients");

export const refreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkReponse)
        // !! Важно для обновления токена в мидлваре, чтобы запись была тут, а не в fetchWithRefresh
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

const fetchWithRefresh = async (endpoint, options) => {
    const url = `${BURGER_API_URL + endpoint}`;
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const getAllIngredientsfetchNoRefresh = () => fetchNoRefresh("/ingredients");

export const createOrderRequest = (ingredientsID) => {
    return fetchWithRefresh("/orders",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                'ingredients': ingredientsID,
            }),
        });
}

export const passwordReset = ({ email }) => { // non-store request
    return fetchNoRefresh("/password-reset",
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

export const passwordResetReset = ({ password, code }) => { // non-store request
    return fetchNoRefresh("/password-reset/reset",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "password": password,
                "token": code // code from email
            }),
        });
}

export const register = ({ email, password, name }) => {
    return fetchNoRefresh("/auth/register",
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
    return fetchNoRefresh("/auth/login",
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

export const logout = () => {
    return fetchNoRefresh("/auth/logout",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken"),
            }),
        });
}

export const getUser = () => {
    return fetchWithRefresh("/auth/user",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("accessToken")
            },
            // body: JSON.stringify({
            //     "token": refreshToken,
            // }),
        });
}

export const updateUser = (user) => {
    console.log("USER="+JSON.stringify(user));
    return fetchWithRefresh("/auth/user",
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify(user)
        });
}