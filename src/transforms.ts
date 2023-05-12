import { LineChartData } from './components/charts/LineChart';
import { PieChartProps } from './components/charts/PieChart';
import { MetricsResponse } from './hooks/useMetricsApi';
import { roundDecimals, tranformFromTypeToTime } from './packages/helpers/timeHelper';
import { TimeType } from './types';

type TransformToPieChartProps = Partial<PieChartProps> & Pick<PieChartProps, 'data'>;

export const transformDowntimeToChartProps = (
  data: Array<MetricsResponse>,
  timeType: TimeType,
): TransformToPieChartProps => {
  const downtime = data.filter(({ id }) => ['cln_shift', 'unexplained', 'mech_problems'].includes(id));

  const downtimePieChart = downtime.map(({ id, label, value, type }) => ({
    id,
    label,
    value: tranformFromTypeToTime(type as TimeType, timeType, value),
  }));

  return { data: downtimePieChart };
};

export const efficiencyAverageTransformProps = (data: Array<MetricsResponse>): TransformToPieChartProps => {
  const efficiency = data.filter(({ id }) => ['oee'].includes(id));

  const downtimePieChart = efficiency.map(({ id, label, value }) => ({
    id,
    label,
    value: value * 100,
  }));

  return {
    data: downtimePieChart,
  };
};

export const transformMetricsToAvailabilityProps = (
  data: Array<MetricsResponse>,
  timeType: TimeType,
): TransformToPieChartProps => {
  const efficiency = data.filter(({ id }) =>
    ['cln_shift', 'unexplained', 'mech_problems', 'shift_duration'].includes(id),
  );

  let availableTime = { label: '', value: 0 };
  let downtime = 0;

  efficiency.forEach(({ id, label, value, type }) => {
    const valueFormattedByTime = tranformFromTypeToTime(type as TimeType, timeType, value);

    if (id === 'shift_duration') {
      availableTime = { label, value: valueFormattedByTime };
      return;
    }

    downtime += valueFormattedByTime;
  });

  return {
    data: [
      {
        id: 'downtime',
        value: roundDecimals(downtime),
        label: 'Downtime',
      },
      {
        id: 'available_time',
        value: roundDecimals(availableTime.value - downtime),
        label: 'Working time',
      },
    ],
  };
};

export const transformLoss = (data: Array<MetricsResponse>): Array<LineChartData> => {
  const loss = data.filter(({ label }) => label.toLocaleLowerCase().includes('loss'));

  return loss.map(({ id, label, value }) => ({
    id,
    label,
    value,
  }));
};
