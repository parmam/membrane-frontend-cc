import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import defaultTheme, { Theme, ThemeMode, getDarkTheme, getLightTheme } from './theme';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeMode: 'dark',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Inicializar con la preferencia del sistema o el tema guardado
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme as ThemeMode;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  // Obtener el tema adecuado basado en el modo
  const [theme, setTheme] = useState<Theme>(
    themeMode === 'light' ? getLightTheme() : getDarkTheme(),
  );

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Aplicar la clase al body cuando cambia el tema
  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${themeMode}-theme`);
    localStorage.setItem('theme-mode', themeMode);

    // Actualizar el objeto theme cuando cambia el modo
    setTheme(themeMode === 'light' ? getLightTheme() : getDarkTheme());
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Exportamos el contexto para que pueda ser usado en useTheme.ts
export { ThemeContext };
