import { NavLink } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../components/ui/navigation-menu';

import { ModeToggle } from '../components/ui/mode-togger';
import { cn } from '../lib/utils';

const items = [
  { name: 'TPS', href: '/' },
  { name: 'Market Cap', href: '/market-cap' },
  { name: 'Wallets', href: '/wallets' },
];

export default function Header() {
  return (
    <header>
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
    </header>
  );
}
