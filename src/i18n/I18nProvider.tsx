import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './config';
// Importar la configuración de i18n
import { LanguageCode, SUPPORTED_LANGUAGES } from './config';

interface I18nContextProps {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => Promise<void>;
  languages: typeof SUPPORTED_LANGUAGES;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const I18nContext = createContext<I18nContextProps | null>(null);

/**
 * Hook personalizado para usar el contexto de I18n
 */
export const useI18n = (): I18nContextProps => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
}

/**
 * Proveedor que gestiona la internacionalización
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // Usamos react-i18next para traducir y cambiar el idioma
  const { t, i18n } = useTranslation();

  // Estado local para el idioma (para forzar actualizaciones)
  const [currentLang, setCurrentLang] = useState<LanguageCode>(i18n.language as LanguageCode);

  // Escuchar cambios de idioma
  useEffect(() => {
    const handleLanguageChanged = (lang: string) => {
      setCurrentLang(lang as LanguageCode);
    };

    // Suscribirse al evento de cambio de idioma
    i18n.on('languageChanged', handleLanguageChanged);

    // Limpiar suscripción
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Función para cambiar el idioma
  const changeLanguage = useCallback(
    async (lang: LanguageCode) => {
      await i18n.changeLanguage(lang);
      // No es necesario actualizar currentLang aquí porque
      // se actualizará a través del evento languageChanged
    },
    [i18n],
  );

  // Memorizar el valor del contexto para evitar renders innecesarios
  const contextValue = useMemo(
    () => ({
      language: currentLang,
      changeLanguage,
      languages: SUPPORTED_LANGUAGES,
      t,
    }),
    [currentLang, changeLanguage, t],
  );

  return <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
