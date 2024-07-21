import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { routes } from '../paths';

// mock API responses as empty arrays
const server = setupServer(
  http.get('*', () => {
    return HttpResponse.json([]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const router = createBrowserRouter(routes);

test('renders index page', async () => {
  render(<RouterProvider router={router} />);

  expect(screen.getByText(/solana tps/i)).toBeInTheDocument();
});

test('navigates to market cap page', async () => {
  render(<RouterProvider router={router} />);
  const user = userEvent.setup();

  // verify page content for expected route after navigating
  await user.click(screen.getByText(/market cap/i));

  await screen.findByText(/Token Market Cap/i);
});

test('navigates to wallet page', async () => {
  render(<RouterProvider router={router} />);
  const user = userEvent.setup();

  // verify page content for expected route after navigating
  await user.click(screen.getByText(/wallets/i));

  await screen.findByText(/Some random wallets/i);
});

test('navigates to TPS page', async () => {
  render(<RouterProvider router={router} />);
  const user = userEvent.setup();

  // verify page content for expected route after navigating
  await user.click(screen.getByText(/tps/i));

  await screen.findByText(/Recent Solana TPS/i);
});

test('renders 404 page', async () => {
  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: ['/bad-route'],
  });
  render(<RouterProvider router={memoryRouter} />);

  await screen.findByText(/not found/i);
});
