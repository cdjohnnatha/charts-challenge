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

  it('Display unavailable charts message to all charts when api responses is 404', () => {
    cy.intercept('GET', '/chart-api', { statusCode: 404, body: {} }).as('getChartApi');
    cy.viewport('macbook-16').visit('http://localhost:3000');

    cy.get(charts.availabilityLastShift.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.downtime.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.efficiencyAverage.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.loss.childSelectors.unavailableMessage).should('be.visible');
  });

  it('Display unavailable charts message to all charts when api responses is 500', () => {
    cy.intercept('GET', '/chart-api', { statusCode: 500, body: {} }).as('getChartApi');
    cy.viewport('macbook-16').visit('http://localhost:3000');

    cy.get(charts.availabilityLastShift.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.downtime.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.efficiencyAverage.childSelectors.unavailableMessage).should('be.visible');
    cy.get(charts.loss.childSelectors.unavailableMessage).should('be.visible');
  });
});
