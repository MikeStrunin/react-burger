import { selectors, userLoginData, BURGER_API_URL } from '../support/constants';

describe('Creating order after login', () => {
    beforeEach(() => {
        cy.prepare();
        cy.visit('/login');

        cy.intercept("POST", `${BURGER_API_URL}/login`, { fixture: "user" });

        cy.get('[data-testid=email_input]').type(`${userLoginData.email}`);
        cy.get('[data-testid=password_input]').type(`${userLoginData.password}{enter}`);
    });

    it('should create order', () => {
        cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');
        cy.get(selectors.constructor.container).trigger('drop');
        cy.get(selectors.constructor.bunTop).should('exist');
        cy.get(selectors.constructor.bunBottom).should('exist');

        cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
        cy.get(selectors.constructor.container).trigger('drop');
        cy.get(selectors.constructor.innerItems).should('not.be.empty');

        cy.get(selectors.constructor.submitOrderButton).should('not.have.attr', 'disabled');
        cy.intercept("POST", `${BURGER_API_URL}/orders`, { fixture: "createdOrder" }).as("createdOrder");
        cy.get(selectors.constructor.submitOrderButton).click();

        cy.get(selectors.modal.container).should('exist');
        cy.get(selectors.modal.orderNumber,).should('not.be.empty');
        cy.get(selectors.modal.closeButton,).click();

        cy.get(selectors.modal.container).should('not.exist');
        cy.get(selectors.constructor.bunTop).should('not.exist');
        cy.get(selectors.constructor.bunBottom).should('not.exist');
        cy.get(selectors.constructor.innerItems).should('not.exist');
    });
});