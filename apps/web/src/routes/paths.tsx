import { RouteObject } from 'react-router-dom';
import Index from '.';
import ErrorPage from '../components/ErrorPage';
import MarketCap from './market-cap';
import Wallets from './wallets';
import Root from './root';

export const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: 'market-cap', element: <MarketCap /> },
      { path: 'wallets', element: <Wallets /> },
    ],
  },
] satisfies RouteObject[];

export const API_URL = 'HTTP://localhost:3001';
