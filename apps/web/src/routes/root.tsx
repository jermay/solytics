import { NavLink, Outlet } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../components/ui/navigation-menu';
import { cn } from '../lib/utils';
import { ThemeProvider } from '../components/ui/theme-provider';
import { ModeToggle } from '../components/ui/mode-togger';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const items = [
  { name: 'TPS', href: '/' },
  { name: 'Market Cap', href: '/market-cap' },
  { name: 'Wallets', href: '/wallets' },
];

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="flex min-h-screen flex-col gap-4 container">
          <NavigationMenu className="grow-0 items-center flex-wrap">
            <span className="text-3xl font-bold text-orange-800 pr-10">
              Solytics
            </span>
            <ModeToggle />
            <NavigationMenuList>
              {items.map((item, index) => (
                <NavigationMenuItem key={index} className="text-2xl">
                  <NavLink
                    to={item.href}
                    className={({ isActive, isPending }) =>
                      cn(
                        navigationMenuTriggerStyle(),
                        isActive ? 'active' : isPending ? 'pending' : '',
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Outlet />
        </main>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
