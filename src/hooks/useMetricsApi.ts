import { useQuery } from '@tanstack/react-query';

export type MetricsResponse = {
  id: string;
  label: string;
  value: number;
  type: 'percentage' | 'secs' | 'hours';
  description: string;
  category: string;
};

const headers = {
  'Content-Type': 'application/json',
};

async function fetchMetricsApi(): Promise<Array<MetricsResponse>> {
  const response = await fetch('http://localhost:3000/chart-api', { headers });
  const metricsJson = await response.json();

  return metricsJson.data;
}

export function useMetricsApi() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetch-wish-list-items'],
    refetchOnWindowFocus: false,
    queryFn: () => fetchMetricsApi(),
  });

  return { data, error, isLoading };
}
