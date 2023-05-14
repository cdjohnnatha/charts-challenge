export type MetricsQueryParams = 'emptyData' | 'notFound' | 'internalError' | 'successDelayed';

export type Metric = {
  id: string;
  label: string;
  value: number;
  type: 'percentage' | 'secs' | 'hours';
  description: string;
  category: string;
};

export type Metrics = Array<Metric>;

const headers = {
  'Content-Type': 'application/json',
};

export default async function fetchMetricsApi(queryParamsType?: MetricsQueryParams): Promise<Metrics> {
  let url = 'http://localhost:3000/chart-api';

  if (queryParamsType) {
    const queryParams = new URLSearchParams({ h: queryParamsType });
    url = `${url}?${queryParams}`;
  }

  const response = await fetch(url, { headers });
  const metricsJson = await response.json();

  return metricsJson.data;
}
