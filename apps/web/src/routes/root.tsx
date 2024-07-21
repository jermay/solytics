import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../components/ui/theme-provider';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="flex min-h-screen flex-col gap-4 container">
          <Header />
          <Outlet />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
