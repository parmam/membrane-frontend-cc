// Importación de iconos solid
// Para verificar el tipo - solo para debug
// console.log('Tipo de icono:', typeof CogSolid, CogSolid);
// Importación de iconos outlined
import CogOutlined from './outlined/cog.svg';
import DesktopOutlined from './outlined/desktop.svg';
import LayerGroupOutlined from './outlined/layer-group.svg';
import ListOutlined from './outlined/list.svg';
import MapMarkerAltOutlined from './outlined/map-marker-alt.svg';
import MemoryOutlined from './outlined/memory.svg';
import MicrochipOutlined from './outlined/microchip.svg';
import ObjectGroupOutlined from './outlined/object-group.svg';
import ShoppingCartOutlined from './outlined/shopping-cart.svg';
import TachometerAltOutlined from './outlined/tachometer-alt.svg';
import TagsOutlined from './outlined/tags.svg';
import UserTagOutlined from './outlined/user-tag.svg';
import UsersOutlined from './outlined/users.svg';
import CogSolid from './solid/cog.svg';
import DesktopSolid from './solid/desktop.svg';
import LayerGroupSolid from './solid/layer-group.svg';
import ListSolid from './solid/list.svg';
import MapMarkerAltSolid from './solid/map-marker-alt.svg';
import MemorySolid from './solid/memory.svg';
import MicrochipSolid from './solid/microchip.svg';
import ObjectGroupSolid from './solid/object-group.svg';
import ShoppingCartSolid from './solid/shopping-cart.svg';
import TachometerAltSolid from './solid/tachometer-alt.svg';
import TagsSolid from './solid/tags.svg';
import UserTagSolid from './solid/user-tag.svg';
import UsersSolid from './solid/users.svg';

// Exportaciones por nombre
export {
  // Solid Icons
  TachometerAltSolid,
  DesktopSolid,
  ListSolid,
  CogSolid,
  UsersSolid,
  LayerGroupSolid,
  MemorySolid,
  MicrochipSolid,
  MapMarkerAltSolid,
  ObjectGroupSolid,
  ShoppingCartSolid,
  TagsSolid,
  UserTagSolid,

  // Outlined Icons
  TachometerAltOutlined,
  DesktopOutlined,
  ListOutlined,
  CogOutlined,
  UsersOutlined,
  LayerGroupOutlined,
  MemoryOutlined,
  MicrochipOutlined,
  MapMarkerAltOutlined,
  ObjectGroupOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UserTagOutlined,
};

// Exportaciones agrupadas por tipo de icono
export const SolidIcons = {
  TachometerAlt: TachometerAltSolid,
  Desktop: DesktopSolid,
  List: ListSolid,
  Cog: CogSolid,
  Users: UsersSolid,
  LayerGroup: LayerGroupSolid,
  Memory: MemorySolid,
  Microchip: MicrochipSolid,
  MapMarkerAlt: MapMarkerAltSolid,
  ObjectGroup: ObjectGroupSolid,
  ShoppingCart: ShoppingCartSolid,
  Tags: TagsSolid,
  UserTag: UserTagSolid,
};

export const OutlinedIcons = {
  TachometerAlt: TachometerAltOutlined,
  Desktop: DesktopOutlined,
  List: ListOutlined,
  Cog: CogOutlined,
  Users: UsersOutlined,
  LayerGroup: LayerGroupOutlined,
  Memory: MemoryOutlined,
  Microchip: MicrochipOutlined,
  MapMarkerAlt: MapMarkerAltOutlined,
  ObjectGroup: ObjectGroupOutlined,
  ShoppingCart: ShoppingCartOutlined,
  Tags: TagsOutlined,
  UserTag: UserTagOutlined,
};

// Exportación de pares de iconos (solid y outlined)
export const Icons = {
  TachometerAlt: {
    Solid: TachometerAltSolid,
    Outlined: TachometerAltOutlined,
  },
  Desktop: {
    Solid: DesktopSolid,
    Outlined: DesktopOutlined,
  },
  List: {
    Solid: ListSolid,
    Outlined: ListOutlined,
  },
  Cog: {
    Solid: CogSolid,
    Outlined: CogOutlined,
  },
  Users: {
    Solid: UsersSolid,
    Outlined: UsersOutlined,
  },
  LayerGroup: {
    Solid: LayerGroupSolid,
    Outlined: LayerGroupOutlined,
  },
  Memory: {
    Solid: MemorySolid,
    Outlined: MemoryOutlined,
  },
  Microchip: {
    Solid: MicrochipSolid,
    Outlined: MicrochipOutlined,
  },
  MapMarkerAlt: {
    Solid: MapMarkerAltSolid,
    Outlined: MapMarkerAltOutlined,
  },
  ObjectGroup: {
    Solid: ObjectGroupSolid,
    Outlined: ObjectGroupOutlined,
  },
  ShoppingCart: {
    Solid: ShoppingCartSolid,
    Outlined: ShoppingCartOutlined,
  },
  Tags: {
    Solid: TagsSolid,
    Outlined: TagsOutlined,
  },
  UserTag: {
    Solid: UserTagSolid,
    Outlined: UserTagOutlined,
  },
};

export default Icons;
