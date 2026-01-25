'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Siren,
  Users,
  Package,
  MessageCircle,
} from 'lucide-react';

const navItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/incidents',
    label: 'Incidents',
    icon: Siren,
  },
  {
    href: '/volunteers',
    label: 'Volunteers',
    icon: Users,
  },
  {
    href: '/resources',
    label: 'Resources',
    icon: Package,
  },
  {
    href: '/messaging',
    label: 'Messaging',
    icon: MessageCircle,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label, side: 'right' }}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
