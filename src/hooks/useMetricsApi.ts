import { useQuery } from '@tanstack/react-query';
import fetchMetricsApi, { MetricsQueryParams } from '../api/fetchMetrics';

export function useMetricsApi(queryParamsType?: MetricsQueryParams) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetch-wish-list-items'],
    refetchOnWindowFocus: false,
    queryFn: () => fetchMetricsApi(queryParamsType),
  });

  return { data, error, isLoading };
}
