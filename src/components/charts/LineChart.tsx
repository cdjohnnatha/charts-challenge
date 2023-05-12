import { ResponsiveBar } from '@nivo/bar';
import Tooltip from './Tooltip';

export type LineChartData = {
  id: string;
  label: string;
  value: number;
};

export type LineProps = {
  data: Array<LineChartData>;
  indexBy: string;
  ariaLabel: string;
};

const LineChart = ({ data, indexBy, ariaLabel }: LineProps) => (
  <ResponsiveBar
    data={data}
    indexBy={indexBy}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    role="application"
    ariaLabel={ariaLabel}
    tooltip={({ color, label, value }) => (
      <Tooltip color={color}>
        {label.replace('value - ', '')}: {value}
      </Tooltip>
    )}
  />
);

export default LineChart;
