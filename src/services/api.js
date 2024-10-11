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
