import { useQuery } from '@tanstack/react-query';

const headers = {
  'Content-Type': 'application/json',
};

async function fetchChartApi() {
  const response = await fetch('http://localhost:3000/chart-api', { headers });
  const jsonData = await response.json();

  return jsonData;
}

export function useChartApi() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['fetch-wish-list-items'],
    refetchOnWindowFocus: false,
    queryFn: () => fetchChartApi(),
  });

  return { data, error, isLoading };
}
