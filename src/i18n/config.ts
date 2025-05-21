import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Importamos los recursos para cada idioma
import en from './locales/en.json';
import es from './locales/es.json';

/**
 * Lista de idiomas soportados por la aplicación.
 * El primer idioma se utiliza como idioma de respaldo.
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

// Recursos de idiomas
const resources = {
  en: en,
  es: es,
};

/**
 * Inicializa i18next con la configuración para nuestra aplicación
 */
i18n
  // Detecta el idioma del navegador
  .use(LanguageDetector)
  // Añade el backend para cargar recursos
  .use(Backend)
  // Pasa i18n a react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma de respaldo si el detector no encuentra un idioma soportado
    debug: process.env.NODE_ENV === 'development', // Muestra logs de depuración en desarrollo

    // Configuramos el namespace por defecto
    defaultNS: 'translation',
    ns: ['translation'],

    interpolation: {
      escapeValue: false, // No escape HTML, React ya lo hace
    },

    // Opciones para el detector de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng', // Clave en localStorage
      caches: ['localStorage'],
    },

    // Habilitar comportamiento de actualización reactiva
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    },

    // Opciones de carga perezosa para futuras divisiones de código
    partialBundledLanguages: true,

    // Opciones de pluralización para localización avanzada
    pluralSeparator: '_',
    nsSeparator: ':',
    keySeparator: '.',
  });

export default i18n;
