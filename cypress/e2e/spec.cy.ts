// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import navbar from '../pageObjects/navbar';

describe('Dashboard', () => {
  describe('Header', () => {
    it('Layout', function () {
      cy.visit('http://localhost:3000');
      cy.get(navbar.title).should('be.visible').and('have.text', 'Reports');
      cy.get(navbar.description).should('be.visible').and('have.text', 'Welcome to reports page');

      cy.get(navbar.toolsArea.container).should('be.visible').and('have.length', 1);
      cy.get(navbar.toolsArea.timeBox).should('be.visible');
      cy.get(navbar.toolsArea.timeBoxLabel).should('be.visible').and('have.text', 'Choose metrics time');
      cy.get(navbar.toolsArea.timeBoxDropdown).should('be.visible');

      cy.get('main .styled-card').should('be.visible').and('have.length', 4);
    });
  });

  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
