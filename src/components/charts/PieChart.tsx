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
  // const secondsToMinutes = (value: number) => value / 60;
  // const clnShift = secondsToMinutes(2280);
  // const unexplained = secondsToMinutes(180);
  // const mechProblems = secondsToMinutes(1210);
  // const shift = 8 * 60;

  // const workingTimeInMinutes = shift - (clnShift + unexplained + mechProblems);

  // const data = [
  //   {
  //     id: 'clnShift',
  //     label: 'cleaning shift',
  //     value: clnShift.toFixed(2),
  //     color: 'hsl(138, 70%, 50%)',
  //   },
  //   {
  //     id: 'unexplained',
  //     label: 'Unexplained problems',
  //     value: unexplained.toFixed(2),
  //     color: 'hsl(255, 70%, 50%)',
  //   },
  //   {
  //     id: 'mechProblems',
  //     label: 'Mechanical Problems',
  //     value: mechProblems.toFixed(2),
  //     color: 'hsl(176, 70%, 50%)',
  //   },
  // ];
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
