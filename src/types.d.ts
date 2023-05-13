export type Category = 'efficiency' | 'shift' | 'downtime';
export type TimeType = 'hours' | 'secs' | 'minutes';
export type MetricsType = 'hours' | 'secs' | 'percentage';
export type Metrics = {
  id: string;
  label: string;
  value: string;
  type: MetricsType;
  category: Category;
  description: string;
};

export type MetricsWithTime = Omit<Metrics, 'type'> & { type: TimeType };

export type MetricsKeys = 'cln_shift' | 'unexplained' | 'mech_problems' | 'shift_duration' | 'oee' | 'lbp' | 'sl';

export type MetricsKeyMap = {
  cln_shift?: Metric;
  unexplained?: Metric;
  mech_problems?: Metric;
  shift_duration?: Metric;
  oee?: Metric;
  lbp?: Metric;
  sl?: Metric;
};
