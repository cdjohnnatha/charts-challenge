import { PieChartProps } from './components/charts/PieChart';
import { Metrics } from './api/fetchMetrics';
import { roundDecimals, tranformFromTypeToTime } from './packages/helpers/timeHelper';
import { MetricsKeyMap, MetricsKeys, TimeType } from './types';

type TransformToPieChartProps = Partial<PieChartProps> & Pick<PieChartProps, 'data'>;

type ChartsTransform = {
  metricsKeyMap: MetricsKeyMap;
  availableCharts: {
    downtime: boolean;
    efficiency: boolean;
    availability: boolean;
    loss: boolean;
  };
};

export const transformChartApiResponseToCharts = (data: Metrics): ChartsTransform => {
  const chartKeys = ['cln_shift', 'unexplained', 'mech_problems', 'shift_duration', 'oee', 'lbp', 'sl'];
  const metricsKeyMap: MetricsKeyMap = {};

  data.forEach((metrics) => {
    if (chartKeys.includes(metrics?.id)) {
      metricsKeyMap[metrics.id as keyof MetricsKeyMap] = metrics;
    }
  });

  return {
    metricsKeyMap,
    availableCharts: {
      downtime: Boolean(metricsKeyMap.cln_shift && metricsKeyMap.unexplained && metricsKeyMap.mech_problems),
      efficiency: Boolean(metricsKeyMap.oee),
      availability: Boolean(
        metricsKeyMap.cln_shift &&
          metricsKeyMap.unexplained &&
          metricsKeyMap.mech_problems &&
          metricsKeyMap.shift_duration,
      ),
      loss: Boolean(metricsKeyMap.lbp && metricsKeyMap.sl),
    },
  };
};

export const transformDowntimeToChartProps = (metrics: MetricsKeyMap, timeType: TimeType): TransformToPieChartProps => {
  const downtimeKeys = ['cln_shift', 'unexplained', 'mech_problems'];
  const downtimePieChart = downtimeKeys.map((key) => {
    const { id, label, value, type } = metrics[key as MetricsKeys];
    return {
      id,
      label,
      value: tranformFromTypeToTime(type as TimeType, timeType, value),
    };
  });

  return { data: downtimePieChart };
};

export const efficiencyAverageTransformProps = (metrics: MetricsKeyMap): TransformToPieChartProps => {
  const efficiencyKeys = ['oee'];
  const efficiencyChart = efficiencyKeys.map((metricKey) => {
    const { id, label, value } = metrics[metricKey as MetricsKeys];
    return {
      id,
      label,
      value: value * 100,
    };
  });

  return {
    data: efficiencyChart,
  };
};

export const transformMetricsToAvailabilityProps = (
  metrics: MetricsKeyMap,
  timeType: TimeType,
): TransformToPieChartProps => {
  const availabilityKeys = ['cln_shift', 'unexplained', 'mech_problems', 'shift_duration'];

  let availableTime = { label: '', value: 0 };
  let downtime = 0;

  availabilityKeys.forEach((metricKey) => {
    const { id, label, value, type } = metrics[metricKey as MetricsKeys];
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

export const transformLoss = (metrics: MetricsKeyMap): TransformToPieChartProps => {
  const lossKeys = ['lbp', 'sl'];

  return {
    data: lossKeys.map((metricKey) => {
      const { id, label, value } = metrics[metricKey as MetricsKeys];
      return {
        id,
        label,
        value,
      };
    }),
  };
};
