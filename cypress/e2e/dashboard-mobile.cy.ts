// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import navbar from '../pageObjects/navbar';
import charts from '../pageObjects/charts';

describe('Dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '/chart-api', { fixture: 'chartApiResponse', statusCode: 200 }).as('getChartApi');
    cy.viewport('iphone-8').visit('http://localhost:3000');
    cy.wait('@getChartApi');
  });

  it('Nav Layout', () => {
    cy.get(navbar.title).should('be.visible').and('have.text', 'Welcome to reports');

    cy.get(navbar.toolsArea.container).should('be.visible').and('have.length', 1);
    cy.get(navbar.toolsArea.timeBox.container).should('be.visible');
    cy.get(navbar.toolsArea.timeBox.label).should('be.visible').and('have.text', 'Choose metrics time');
    cy.get(navbar.toolsArea.timeBox.dropdown).should('be.visible');

    cy.get(charts.cards).should('be.visible').and('have.length', 4);
  });

  it('Cards Layout', () => {
    cy.get(charts.availabilityLastShift.childSelectors.card).should('be.visible');
    cy.get(charts.availabilityLastShift.childSelectors.title).should('be.visible');
    cy.get(charts.downtime.childSelectors.card).should('be.visible');
    cy.get(charts.downtime.childSelectors.title).should('be.visible');
    cy.get(charts.efficiencyAverage.childSelectors.card).should('be.visible');
    cy.get(charts.efficiencyAverage.childSelectors.title).should('be.visible');
    cy.get(charts.loss.childSelectors.card).should('be.visible');
    cy.get(charts.loss.childSelectors.title).should('be.visible');
  });

  it('Match default dropdown timebox by minutes should use minutes in charts', () => {
    charts.getChartValues('downtime').should('deep.equal', ['38 min', '3 min', '20.16 min']);
    charts.getChartValues('availabilityLastShift').should('deep.equal', ['61.16 min', '418.84 min']);
  });

  describe('Page loading', () => {
    it('Displays skeleton when page is loading', () => {
      cy.intercept('GET', '/chart-api', { fixture: 'chartApiResponse', delay: 1000 }).as('getChartApi');
      cy.viewport('macbook-16').visit('http://localhost:3000');
      cy.get('.react-loading-skeleton').should('be.visible').and('have.length', 4);
    });

    it('Timebox dropdown should be disabled when page is loading', () => {
      cy.intercept('GET', '/chart-api', { fixture: 'chartApiResponse', delay: 1000 }).as('getChartApi');
      cy.viewport('macbook-16').visit('http://localhost:3000');
      cy.get(navbar.toolsArea.timeBox.dropdown).should('be.disabled');
    });
  });

  describe('Tools area', () => {
    const timeBoxOptions = { hours: 'hours', minutes: 'minutes', secs: 'secs' };

    describe('Select dropdown timebox by secs', () => {
      it('Clicking in secs metric should update the downtime chart to secs', () => {
        charts.getChartValues('downtime').should('deep.equal', ['38 min', '3 min', '20.16 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.secs);
        charts.getChartValues('downtime').should('deep.equal', ['2280 secs', '180 secs', '1210 secs']);
      });

      it('Clicking in secs metric should  update the availability in last shift chart', () => {
        charts.getChartValues('availabilityLastShift').should('deep.equal', ['61.16 min', '418.84 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.secs);

        charts.getChartValues('availabilityLastShift').should('deep.equal', ['3670 secs', '25130 secs']);
      });
    });

    describe('Select dropdown timebox by hour', () => {
      it('Clicking in hours metric should update the downtime chart to hours', () => {
        charts.getChartValues('downtime').should('deep.equal', ['38 min', '3 min', '20.16 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.hours);
        charts.getChartValues('downtime').should('deep.equal', ['0h:38min', '0h:3min', '0h:20min']);
      });

      it('Clicking in hours metric should update the availability in last shift chart to use hours', () => {
        charts.getChartValues('availabilityLastShift').should('deep.equal', ['61.16 min', '418.84 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.hours);

        charts.getChartValues('availabilityLastShift').should('deep.equal', ['1h:1min', '6h:59min']);
      });
    });
  });
});
