import { selectors } from '../support/constants';

describe("Drag'n'Drop", () => {
    beforeEach(() => {
        cy.prepare();
    });

    describe('drag and drop items into constructor', () => {
        it('should drag and drop bun into constructor', () => {
            cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');

            cy.get(selectors.constructor.container).should('exist');
            cy.get(selectors.constructor.container).trigger('drop');

            cy.get(selectors.constructor.bunTop).should('exist');
            cy.get(selectors.constructor.bunBottom).should('exist');

            cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
            cy.get(selectors.constructor.container).trigger('drop');
            cy.get(selectors.constructor.innerItems).should('not.be.empty');
        });
    });
});