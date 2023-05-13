export const chartNames = ['efficiencyAverage', 'downtime', 'availabilityLastShift', 'loss'] as const;
type ChartNames = (typeof chartNames)[number];

type ChartElementSelectors = {
  card: string;
  chart: string;
  title: string;
  description: string;
  allText: string;
  unavailableMessage: string;
};

class Chart {
  selector: string;
  childSelectors: ChartElementSelectors;

  constructor(selector: string) {
    this.selector = selector;
    this.childSelectors = {
      card: this.selector,
      chart: `${this.selector} div:first-child`,
      title: `${this.selector} h3`,
      description: `${this.selector} p`,
      allText: `${this.selector} g text`,
      unavailableMessage: `${this.selector} h2`,
    };
  }
}

class Charts {
  cards = 'main .styled-card';
  efficiencyAverage: Chart;
  downtime: Chart;
  availabilityLastShift: Chart;
  loss: Chart;

  constructor() {
    this.efficiencyAverage = new Chart(`${this.cards}#chart-efficiency-average`);
    this.downtime = new Chart(`${this.cards}#chart-downtime`);
    this.availabilityLastShift = new Chart(`${this.cards}#chart-availability-last-shift`);
    this.loss = new Chart(`${this.cards}#chart-loss`);
  }

  isNumber = (text: string) => /^-?[0-9]+(?:\.[0-9]+)?$/.test(text + '');

  getAllChartText(chartName: ChartNames) {
    return cy.get(this[chartName].childSelectors.allText);
  }

  getChartValues(chartName: ChartNames) {
    const values: Array<string> = [];
    return this.getAllChartText(chartName)
      .each(($el) => {
        const text = $el.text();
        const textWithoutTimeType = text.replace(/(secs|min|:|h|%)/g, '').trim();

        if (this.isNumber(textWithoutTimeType)) {
          values.push(text);
        }
      })
      .then(() => values);
  }

  getChartLabels(chartName: ChartNames): Array<string> {
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
