import { ResponsivePie } from '@nivo/pie';
// import styled from 'styled-components';
import Tooltip from './Tooltip';

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color?: string;
};

type SufixType = 'percentage' | 'minutes' | 'hours' | 'secs';

export type PieChartProps = {
  data: Array<PieChartData>;
  useUncomplete?: boolean;
  sufixType?: SufixType;
  showOutLabels?: boolean;
};

const MAX_END_ANGLE = 360;

const PieChart = ({ data, useUncomplete, sufixType }: PieChartProps) => {
  const valueFormatter = (value: number): string => {
    let sufix = '';
    switch (sufixType) {
      case 'percentage': {
        sufix = '%';
        break;
      }
      case 'hours': {
        sufix = 'h';
        break;
      }
      case 'minutes': {
        sufix = 'min';
        break;
      }
      case 'secs': {
        sufix = 'secs';
        break;
      }
      default: {
        sufix = 'min';
      }
    }
    return `${value} ${sufix}`;
  };
  let endAngle = null;

  if (useUncomplete) {
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
      arcLinkLabel={(d) => `${d.label}`}
      valueFormat={valueFormatter}
      {...(endAngle && { endAngle })}
      tooltip={({ datum: { label, value, color } }) => (
        <Tooltip color={color}>
          {label}: {valueFormatter(value)}
        </Tooltip>
      )}
    />
  );
};

export default PieChart;
