class Navbar {
  title = 'nav h1';
  toolsArea = {
    container: 'nav div:nth-child(3)',
    timeBox: {
      container: 'nav div:nth-child(3) div:first-child',
      label: 'nav div:nth-child(3) div:first-child label',
      dropdown: 'nav div:nth-child(3) div:first-child select',
      dropdownOptions: 'nav div:nth-child(3) div:first-child options',
    },
  };

  clickOnTimeTypeSelect(labelToSelect: string) {
    cy.get(this.toolsArea.timeBox.dropdown).should('be.visible').select(labelToSelect);
  }

  selectTheNthTypeSelect(index = 0) {
    cy.get(this.toolsArea.timeBox.dropdownOptions).eq(index).scrollIntoView().should('be.visible').click();
  }
}

export default new Navbar();
