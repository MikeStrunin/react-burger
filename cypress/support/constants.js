export const BURGER_API_URL = "https://norma.nomoreparties.space/api"

export const userLoginData = {
    email: "mihastrunin@yandex.ru",
    password: '111',
}

export const selectors = {
    login: {
        emailField: '[data-testid=email_input]',
        passwordField: '[data-testid=password_input]'
    },

    modal: {
        container: '[data-testid=modalContainer]',
        orderNumber: '[data-test=orderNumber]',
        closeButton: '[data-testid=modalCloseButton]',
        overlay: '[data-testid=modalOverlay]'
    },

    ingredients: {
        ingredient: '[data-test=ingredientItem]'
    },

    constructor: {
        container: '[data-test=constructorContainer]',
        bunTop: '[data-test=constructorBunTop]',
        bunBottom: '[data-test=constructorBunBottom]',
        innerItems: '[data-test=constructorInnerItems]',
        submitOrderButton: '[data-test=submitOrderButton]'
    }
};