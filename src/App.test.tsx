import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import mockDataApi from './mocks/mockDataApi.json';
import fetchMetrics, { Metrics } from './api/fetchMetrics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

jest.mock('./api/fetchMetrics.ts');

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('unavailable messages', () => {
    it('Does present an error message when data is unavailable', async () => {
      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve([]));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(4);
      });
    });

    it('Does present an error message in donwtime and availability when cln_shift is unavailable', async () => {
      const mockData = mockDataApi.data.filter((mockData) => mockData.id !== 'cln_shift') as unknown as Metrics;

      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve(mockData));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(2);
      });
    });

    it('Does present an error message in donwtime and availability when mech_problems is unavailable', async () => {
      const mockData = mockDataApi.data.filter((mockData) => mockData.id !== 'mech_problems') as unknown as Metrics;

      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve(mockData));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(2);
      });
    });

    it('Does present an error message in availability when shift_duration is unavailable', async () => {
      const mockData = mockDataApi.data.filter((mockData) => mockData.id !== 'mech_problems') as unknown as Metrics;

      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve(mockData));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(2);
      });
    });

    it('Does present an error message in efficiency when oee is unavailable', async () => {
      const mockData = mockDataApi.data.filter((mockData) => mockData.id !== 'mech_problems') as unknown as Metrics;

      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve(mockData));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(2);
      });
    });

    it('Does present an error message in loss when lbp is unavailable', async () => {
      const mockData = mockDataApi.data.filter((mockData) => mockData.id !== 'mech_problems') as unknown as Metrics;

      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve(mockData));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(2);
      });
    });

    it('Does present an error message in loss when sl is unavailable', async () => {
      const mockData = mockDataApi.data.filter((mockData) => mockData.id !== 'mech_problems') as unknown as Metrics;

      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(Promise.resolve(mockData));
      const { getAllByRole } = renderApp();

      await waitFor(() => {
        const unavailableMessage = getAllByRole('heading', { name: 'This chart is unavailable' });
        expect(unavailableMessage.length).toBe(2);
      });
    });
  });

  describe('timeBox', () => {
    it('Selecing secs in time dropdown should update downtime and availability chart', async () => {
      (fetchMetrics as jest.MockedFunction<typeof fetchMetrics>).mockReturnValue(
        Promise.resolve(mockDataApi as unknown as Metrics),
      );

      const { getByRole, getByText } = renderApp();
      const dropdown = getByRole('combobox');
      fireEvent.change(dropdown, { target: { value: 'secs' } });

      await waitFor(() => {
        expect(getByText('Choose metrics time')).toBeVisible();
        expect(getByRole('combobox')).toHaveValue('secs');
      });
    });
  });
});

function renderApp() {
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}
