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
  icon: IconDefinition;
  path: string;
  active?: boolean;
}

export interface SidebarItemGroup {
  id: string;
  label: string;
  icon: IconDefinition;
  items: SidebarItem[];
  expanded?: boolean;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: faTachometerAlt,
    path: '/dashboard',
  },
  {
    id: 2,
    label: 'Monitoreo',
    icon: faDesktop,
    path: '/monitoreo',
  },
  {
    id: 3,
    label: 'Últimos estados',
    icon: faList,
    path: '/ultimos-estados',
    active: true,
  },
];

export const sidebarItemGroups: SidebarItemGroup[] = [
  {
    id: 'admin',
    label: 'Administración',
    icon: faCog,
    expanded: true,
    items: [
      {
        id: 4,
        label: 'Usuarios',
        icon: faUsers,
        path: '/admin/usuarios',
      },
      {
        id: 5,
        label: 'Roles',
        icon: faUserTag,
        path: '/admin/roles',
      },
      {
        id: 6,
        label: 'Sitios',
        icon: faMapMarkerAlt,
        path: '/admin/sitios',
      },
      {
        id: 7,
        label: 'Grupos',
        icon: faObjectGroup,
        path: '/admin/grupos',
      },
      {
        id: 8,
        label: 'Dispositivos',
        icon: faMicrochip,
        path: '/admin/dispositivos',
      },
      {
        id: 9,
        label: 'Marcas',
        icon: faTags,
        path: '/admin/marcas',
      },
      {
        id: 10,
        label: 'Modelos',
        icon: faLayerGroup,
        path: '/admin/modelos',
      },
      {
        id: 11,
        label: 'Firmwares',
        icon: faMemory,
        path: '/admin/firmwares',
      },
    ],
  },
];
