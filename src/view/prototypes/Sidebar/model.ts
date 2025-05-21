import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import {
  faChevronDown,
  faCog,
  faDesktop,
  faLayerGroup,
  faList,
  faMapMarkerAlt,
  faMemory,
  faMicrochip,
  faObjectGroup,
  faTachometerAlt,
  faTags,
  faUserTag,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export interface SidebarItem {
  id: number;
  label: string;
  translationKey: string;
  icon: IconDefinition;
  path: string;
  active?: boolean;
}

export interface SidebarItemGroup {
  id: string;
  label: string;
  translationKey: string;
  icon: IconDefinition;
  items: SidebarItem[];
  expanded?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    translationKey: 'navigation.dashboard',
    icon: faTachometerAlt,
    path: '/dashboard',
  },
  {
    id: 2,
    label: 'Monitoreo',
    translationKey: 'navigation.monitoring',
    icon: faDesktop,
    path: '/monitoreo',
  },
  {
    id: 3,
    label: 'Últimos estados',
    translationKey: 'navigation.latestStates',
    icon: faList,
    path: '/ultimos-estados',
    active: true,
  },
];

export const sidebarItemGroups: SidebarItemGroup[] = [
  {
    id: 'admin',
    label: 'Administración',
    translationKey: 'navigation.administration',
    icon: faCog,
    expanded: true,
    items: [
      {
        id: 4,
        label: 'Usuarios',
        translationKey: 'navigation.users',
        icon: faUsers,
        path: '/admin/usuarios',
      },
      {
        id: 5,
        label: 'Roles',
        translationKey: 'navigation.roles',
        icon: faUserTag,
        path: '/admin/roles',
      },
      {
        id: 6,
        label: 'Sitios',
        translationKey: 'navigation.sites',
        icon: faMapMarkerAlt,
        path: '/admin/sitios',
      },
      {
        id: 7,
        label: 'Grupos',
        translationKey: 'navigation.groups',
        icon: faObjectGroup,
        path: '/admin/grupos',
      },
      {
        id: 8,
        label: 'Dispositivos',
        translationKey: 'navigation.devices',
        icon: faMicrochip,
        path: '/admin/dispositivos',
      },
      {
        id: 9,
        label: 'Marcas',
        translationKey: 'navigation.brands',
        icon: faTags,
        path: '/admin/marcas',
      },
      {
        id: 10,
        label: 'Modelos',
        translationKey: 'navigation.models',
        icon: faLayerGroup,
        path: '/admin/modelos',
      },
      {
        id: 11,
        label: 'Firmwares',
        translationKey: 'navigation.firmwares',
        icon: faMemory,
        path: '/admin/firmwares',
      },
    ],
  },
];
