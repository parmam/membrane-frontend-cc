import React, { useEffect, useState } from 'react';

import { LanguageCode, SUPPORTED_LANGUAGES, useI18n } from '../../../i18n';
import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, changeLanguage, t } = useI18n();
  // Estado local para forzar re-renderización
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language);

  // Actualizar estado local cuando cambia el idioma globalmente
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const handleLanguageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value as LanguageCode;

    try {
      // Cambiar idioma primero para que las traducciones se actualicen
      await changeLanguage(newLanguage);
      // Actualizar estado local
      setCurrentLanguage(newLanguage);
    } catch (error) {
      console.error('Error al cambiar el idioma:', error);
    }
  };

  return (
    <div className={`${styles.selector} ${className}`}>
      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        className={styles.select}
        aria-label={t('common.language')}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
