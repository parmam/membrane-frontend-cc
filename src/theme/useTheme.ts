import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';
import { Theme, ThemeMode } from './theme';

/**
 * Hook para acceder al tema actual de la aplicación
 * @returns El tema actual y las funciones para manipularlo
 */
export const useTheme = (): Theme & { themeMode: ThemeMode; toggleTheme: () => void } => {
  const { theme, themeMode, toggleTheme } = useContext(ThemeContext);
  return { ...theme, themeMode, toggleTheme };
};

export default useTheme;
