// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import navbar from '../pageObjects/navbar';
import charts from '../pageObjects/charts';

describe('Dashboard', () => {
  beforeEach(() => {
    cy.viewport('macbook-16').visit('http://localhost:3000');
  });

  it('Nav Layout', function () {
    cy.get(navbar.title).should('be.visible').and('have.text', 'Welcome to reports');

    cy.get(navbar.toolsArea.container).should('be.visible').and('have.length', 1);
    cy.get(navbar.toolsArea.timeBox.container).should('be.visible');
    cy.get(navbar.toolsArea.timeBox.label).should('be.visible').and('have.text', 'Choose metrics time');
    cy.get(navbar.toolsArea.timeBox.dropdown).should('be.visible');

    cy.get(charts.cards).should('be.visible').and('have.length', 4);
  });

  it('Cards Layout', () => {
    const cardNames = Object.keys(charts.card);
    cardNames.forEach((name) => {
      const { card, title } = charts.card[name as keyof typeof charts.card];
      cy.get(card).scrollIntoView().should('be.visible');
      cy.get(title).should('be.visible');
    });
  });

  it('Match default dropdown timebox by minutes should use minutes in charts', () => {
    charts.getChartValues(charts.names.downtime).should('deep.equal', ['38 min', '3 min', '20.16 min']);
    charts.getChartValues(charts.names.availabilityLastShift).should('deep.equal', ['61.16 min', '418.84 min']);
  });

  describe('Tools area', () => {
    const timeBoxOptions = { hours: 'hours', minutes: 'minutes', secs: 'secs' };

    describe('Select dropdown timebox by secs', () => {
      it('Clicking in secs metric should update the downtime chart to secs', () => {
        charts.getChartValues(charts.names.downtime).should('deep.equal', ['38 min', '3 min', '20.16 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.secs);
        charts.getChartValues(charts.names.downtime).should('deep.equal', ['2280 secs', '180 secs', '1210 secs']);
      });

      it('Clicking in secs metric should  update the availability in last shift chart', () => {
        charts.getChartValues(charts.names.availabilityLastShift).should('deep.equal', ['61.16 min', '418.84 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.secs);

        charts.getChartValues(charts.names.availabilityLastShift).should('deep.equal', ['3670 secs', '25130 secs']);
      });
    });

    describe('Select dropdown timebox by hour', () => {
      it('Clicking in hours metric should update the downtime chart to hours', () => {
        charts.getChartValues(charts.names.downtime).should('deep.equal', ['38 min', '3 min', '20.16 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.hours);
        charts.getChartValues(charts.names.downtime).should('deep.equal', ['0h:38min', '0h:3min', '0h:20min']);
      });

      it('Clicking in hours metric should update the availability in last shift chart to use hours', () => {
        charts.getChartValues(charts.names.availabilityLastShift).should('deep.equal', ['61.16 min', '418.84 min']);
        navbar.clickOnTimeTypeSelect(timeBoxOptions.hours);

        charts.getChartValues(charts.names.availabilityLastShift).should('deep.equal', ['1h:1min', '6h:59min']);
      });
    });
  });
  // eslint-disable-next-line no-console
  // more examples
  //
  // https://github.com/cypress-io/cypress-example-todomvc
  // https://github.com/cypress-io/cypress-example-kitchensink
  // https://on.cypress.io/writing-your-first-test
});
