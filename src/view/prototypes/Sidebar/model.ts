// Importamos nuestros iconos personalizados
import { Icons } from '@/assets/icons';

import type { FC, SVGProps } from 'react';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Tipo para permitir ambos tipos de iconos
export type IconType =
  | IconDefinition
  | {
      Solid: FC<SVGProps<SVGElement>> | string;
      Outlined: FC<SVGProps<SVGElement>> | string;
    };

export interface SidebarItem {
  id: number;
  label: string;
  translationKey: string;
  icon: IconType;
  path: string;
  active?: boolean;
}

export interface SidebarItemGroup {
  id: string;
  label: string;
  translationKey: string;
  icon: IconType;
  items: SidebarItem[];
  expanded?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    translationKey: 'navigation.dashboard',
    icon: Icons.TachometerAlt,
    path: '/dashboard',
  },
  {
    id: 2,
    label: 'Monitoreo',
    translationKey: 'navigation.monitoring',
    icon: Icons.Desktop,
    path: '/monitoreo',
  },
  {
    id: 3,
    label: 'Últimos estados',
    translationKey: 'navigation.latestStates',
    icon: Icons.List,
    path: '/ultimos-estados',
    active: true,
  },
];

export const sidebarItemGroups: SidebarItemGroup[] = [
  {
    id: 'admin',
    label: 'Administración',
    translationKey: 'navigation.administration',
    icon: Icons.Cog,
    expanded: false,
    items: [
      {
        id: 4,
        label: 'Usuarios',
        translationKey: 'navigation.users',
        icon: Icons.Users,
        path: '/admin/usuarios',
      },
      {
        id: 5,
        label: 'Roles',
        translationKey: 'navigation.roles',
        icon: Icons.UserTag,
        path: '/admin/roles',
      },
      {
        id: 6,
        label: 'Sitios',
        translationKey: 'navigation.sites',
        icon: Icons.MapMarkerAlt,
        path: '/admin/sitios',
      },
      {
        id: 7,
        label: 'Grupos',
        translationKey: 'navigation.groups',
        icon: Icons.ObjectGroup,
        path: '/admin/grupos',
      },
    ],
  },
  {
    id: 'products',
    label: 'Productos',
    translationKey: 'navigation.products',
    icon: Icons.ShoppingCart,
    expanded: false,
    items: [
      {
        id: 8,
        label: 'Dispositivos',
        translationKey: 'navigation.devices',
        icon: Icons.Microchip,
        path: '/admin/dispositivos',
      },
      {
        id: 9,
        label: 'Marcas',
        translationKey: 'navigation.brands',
        icon: Icons.Tags,
        path: '/admin/marcas',
      },
      {
        id: 10,
        label: 'Modelos',
        translationKey: 'navigation.models',
        icon: Icons.LayerGroup,
        path: '/admin/modelos',
      },
      {
        id: 11,
        label: 'Firmwares',
        translationKey: 'navigation.firmwares',
        icon: Icons.Memory,
        path: '/admin/firmwares',
      },
    ],
  },
];
