/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../components/ui/theme-provider';

// prevent react-query from retrying requests so error tests don't timeout
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
