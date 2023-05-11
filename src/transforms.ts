import { LineChartData } from './components/charts/LineChart';
import { PieChartData } from './components/charts/PieChart';
import { MetricsResponse } from './hooks/useMetricsApi';
import { tranformFromTypeToTime } from './packages/helpers/timeHelper';
import { TimeType } from './types';

export const transformDowntime = (data: Array<MetricsResponse>, timeType: TimeType): Array<PieChartData> => {
  const downtime = data.filter(({ id }) => ['cln_shift', 'unexplained', 'mech_problems'].includes(id));

  const downtimePieChart = downtime.map(({ id, label, value, type }) => ({
    id,
    label,
    value: tranformFromTypeToTime(type as TimeType, timeType, value),
  }));

  return downtimePieChart;
};

export const transformEfficiency = (data: Array<MetricsResponse>): Array<PieChartData> => {
  const efficiency = data.filter(({ id }) => ['oee'].includes(id));

  const downtimePieChart = efficiency.map(({ id, label, value }) => ({
    id,
    label,
    value: value * 100,
  }));

  return downtimePieChart;
};

export const transformAvailability = (data: Array<MetricsResponse>, timeType: TimeType): Array<PieChartData> => {
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

  return [
    {
      id: 'downtime',
      value: downtime,
      label: 'Downtime',
    },
    {
      id: 'available_time',
      value: availableTime.value - downtime,
      label: 'Available time in shift',
    },
  ];
};

export const transformLoss = (data: Array<MetricsResponse>): Array<LineChartData> => {
  const loss = data.filter(({ label }) => label.toLocaleLowerCase().includes('loss'));

  return loss.map(({ id, label, value }) => ({
    id,
    label,
    value,
  }));
};
