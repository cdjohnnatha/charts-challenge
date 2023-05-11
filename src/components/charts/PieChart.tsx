import { ResponsivePie } from '@nivo/pie';

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color?: string;
};

export type PieChartProps = {
  data: Array<PieChartData>;
  formatPercentage?: boolean;
  useUncomplete?: boolean;
};

const MAX_END_ANGLE = 360;

const PieChart = ({ data, formatPercentage, useUncomplete }: PieChartProps) => {
  const displayPercentage = (e: number) => e + '%';
  let endAngle = null;

  if (data.length === 1 && useUncomplete) {
    endAngle = (MAX_END_ANGLE * data[0].value) / 100;
  }

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      {...(formatPercentage && { valueFormat: displayPercentage })}
      {...(endAngle && { endAngle })}
    />
  );
};

export default PieChart;
