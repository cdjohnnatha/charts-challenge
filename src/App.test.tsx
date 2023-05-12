import { fireEvent, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import mockDataApi from './mocks/mockDataApi.json';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockDataApi),
  }),
) as jest.Mock;

describe('App', () => {
  describe('timeBox', () => {
    it('Render proper dropdown', () => {
      const { getByRole, getAllByRole, getByText } = renderApp();

      expect(getAllByRole('option').length).toBe(3);
      expect(getByText('Choose metrics time')).toBeVisible();
      expect(getByRole('combobox')).toHaveValue('minutes');
    });

    it('Selecing secs in time dropdown should update downtime and availability chart', () => {
      const { getByRole, getByText } = renderApp();

      const dropdown = getByRole('combobox');

      fireEvent.change(dropdown, { target: { value: 'secs' } });

      expect(getByText('Choose metrics time')).toBeVisible();
      expect(getByRole('combobox')).toHaveValue('secs');
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

// function createPdpAppData(): AppData {
//   return {
//     pdpData: {
//       productKey: 'x',
//       partNumber: 'x',
//       productResponse: createProductResponse({}),
//     },
//   };
// }
