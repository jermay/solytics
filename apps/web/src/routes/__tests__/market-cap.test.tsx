import { render, screen, waitForElementToBeRemoved } from 'test-utils';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '../paths';
import MarketCap from '../market-cap';

// mock API responses as empty arrays
const server = setupServer(
  http.get(`${API_URL}/market-cap`, () => {
    return HttpResponse.json([
      { slot: 1, tps: 3000 },
      { slot: 2, tps: 2000 },
      { slot: 3, tps: 1000 },
    ]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders loading state', async () => {
  render(<MarketCap />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test('renders chart', async () => {
  const result = render(<MarketCap />);

  await waitForElementToBeRemoved(result.getByText(/Loading/i));

  await result.findByTestId('market-cap-chart');
});