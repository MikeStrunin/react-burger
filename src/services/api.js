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

export const getAllIngredientsRequest = async () => {
    const res = await fetch(`${apiConfig.baseUrl}/ingredients`);
    return getResponse(res);
};

export const createOrderRequest = async (ingredientsID) => {
    const res = await fetch(`${apiConfig.baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ingredients': ingredientsID,
        }),
    });
    return getResponse(res);
}
