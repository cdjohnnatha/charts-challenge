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
