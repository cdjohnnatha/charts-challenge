/// <reference types="cypress" />

import charts from '../pageObjects/charts';

describe('Unavailable charts', () => {
  it('Display unavailable charts message to all charts when data is an empty array', () => {
    cy.intercept('GET', '/chart-api', { data: [] }).as('getChartApi');
    cy.viewport('macbook-16').visit('http://localhost:3000');

    cy.get(charts.availabilityLastShift.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.downtime.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.efficiencyAverage.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.loss.childSelectors.unavailableMessage).should('be.visible');
  });
});
