import { useI18n } from '@/i18n';

import useTheme from '@theme/useTheme';

import './styles.css';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { themeMode, toggleTheme } = useTheme();
  const { t } = useI18n();

  // Determinar qué modo mostrar en el título e info de accesibilidad
  const nextMode = themeMode === 'light' ? 'dark' : 'light';
  const ariaLabel = t(`theme.switchTo${nextMode.charAt(0).toUpperCase() + nextMode.slice(1)}`);

  return (
    <button
      className={`theme-toggle ${className} ${themeMode}-mode`}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <div className='toggle-track'>
        <div className='toggle-indicator'>
          <span className='toggle-icon'>{themeMode === 'dark' ? '🌙' : '☀️'}</span>
        </div>
        <span className='toggle-mode-text light-icon'>☀️</span>
        <span className='toggle-mode-text dark-icon'>🌙</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
