import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Users,
  Settings,
  Home,
  Scissors,
  Camera,
  MessageSquare,
  Receipt,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Appointments', href: '/appointments', icon: Calendar },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Gallery', href: '/gallery', icon: Camera },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white/60 backdrop-blur-xl border-r border-border/40 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-x-3">
            <div className="rounded-lg bg-primary/10 p-2 ring-2 ring-primary/20">
              <Scissors className="h-6 w-6 text-primary" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Pawfect Grooming
            </span>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          'group flex gap-x-3 rounded-lg p-2 text-sm leading-6 font-medium transition-all duration-200',
                          location.pathname === item.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                        )}
                      >
                        <Icon
                          className={cn(
                            'h-6 w-6 shrink-0 transition-colors duration-200',
                            location.pathname === item.href
                              ? 'text-primary'
                              : 'text-muted-foreground group-hover:text-primary'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}