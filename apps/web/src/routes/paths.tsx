import { RouteObject } from 'react-router-dom';
import Index from '.';
import ErrorPage from '../components/ErrorPage';
import MarketCap from './market-cap';
import Wallets from './wallets';
import Root from './Root';

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
