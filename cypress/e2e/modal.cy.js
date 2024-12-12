import { selectors } from '../support/constants';

describe('modal window: open and close', () => {
    beforeEach(() => {
        cy.prepare();
    });

    it('should open modal window and close by click on close button', () => {
        cy.get(selectors.ingredients.ingredient + ':eq(0)').click();
        cy.get(selectors.modal.container).should('exist');

        cy.get(selectors.modal.closeButton).click();
        cy.get(selectors.modal.container).should('not.exist');
    });

    it('should open modal window and close by click on overlay', () => {
        cy.get(selectors.ingredients.ingredient + ':eq(0)').click();
        cy.get(selectors.modal.container).should('exist');

        cy.get(selectors.modal.overlay).click({ force: true });
        cy.get(selectors.modal.container).should('not.exist');
    });
});