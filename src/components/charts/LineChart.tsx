import { ResponsiveBar } from '@nivo/bar';

export type LineChartData = {
  id: string;
  label: string;
  value: number;
};

export type LineProps = {
  data: Array<LineChartData>;
  indexBy: string;
};

const LineChart = ({ data, indexBy }: LineProps) => (
  <ResponsiveBar
    data={data}
    indexBy={indexBy}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
  />
);

export default LineChart;
