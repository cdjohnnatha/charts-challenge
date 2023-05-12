class Charts {
  cards = 'main .styled-card';
  selectors = {
    efficiencyAverage: '#chart-efficiency-average',
    downtime: '#chart-downtime',
    availabilityLastShift: '#chart-availability-last-shift',
    loss: '#chart-loss',
  };
  names = {
    efficiencyAverage: 'efficiencyAverage',
    downtime: 'downtime',
    availabilityLastShift: 'availabilityLastShift',
    loss: 'loss',
  };
  card = {
    efficiencyAverage: {
      card: `${this.cards}${this.selectors.efficiencyAverage}`,
      chart: `${this.cards}${this.selectors.efficiencyAverage} div:first-child`,
      title: `${this.cards}${this.selectors.efficiencyAverage} h3`,
      description: `${this.cards}${this.selectors.efficiencyAverage} p`,
      allText: `${this.cards}${this.selectors.efficiencyAverage} g text`,
    },
    downtime: {
      card: `${this.cards}${this.selectors.downtime}`,
      chart: `${this.cards}${this.selectors.downtime} div:first-child`,
      title: `${this.cards}${this.selectors.downtime} h3`,
      description: `${this.cards}${this.selectors.downtime} p`,
      allText: `${this.cards}${this.selectors.downtime} g text`,
    },
    availabilityLastShift: {
      card: `${this.cards}${this.selectors.availabilityLastShift}`,
      chart: `${this.cards}${this.selectors.availabilityLastShift} div:first-child`,
      title: `${this.cards}${this.selectors.availabilityLastShift} h3`,
      description: `${this.cards}${this.selectors.availabilityLastShift} p`,
      allText: `${this.cards}${this.selectors.availabilityLastShift} g text`,
    },
    loss: {
      card: `${this.cards}${this.selectors.loss}`,
      chart: `${this.cards}${this.selectors.loss} div:first-child`,
      title: `${this.cards}${this.selectors.loss} h3`,
      description: `${this.cards}${this.selectors.loss} p`,
      allText: `${this.cards}${this.selectors.loss} g text`,
    },
  };

  isNumber = (text: string) => /^-?[0-9]+(?:\.[0-9]+)?$/.test(text + '');

  getAllChartText(chartName: string) {
    const name = chartName as keyof typeof this.names;
    return cy.get(this.card[name].allText);
  }

  getChartValues(chartName: string) {
    const values: Array<string> = [];
    return this.getAllChartText(chartName)
      .each(($el) => {
        const text = $el.text();
        const textWithoutTimeType = text.replace('secs', '').replace('h', '').replace('min', '').trim();
        if (this.isNumber(textWithoutTimeType)) {
          values.push(text);
        }
      })
      .then(() => values);
  }

  getChartLabels(chartName: string): Array<string> {
    const values: Array<string> = [];
    this.getAllChartText(chartName).each((textEl) => {
      const text = textEl.text();
      if (!this.isNumber(text)) {
        values.push(text);
      }
    });

    return values;
  }
}

export default new Charts();
