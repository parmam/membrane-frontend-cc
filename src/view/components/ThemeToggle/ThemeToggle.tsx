import useTheme from '@theme/useTheme';

import './styles.css';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${className} ${themeMode}-mode`}
      onClick={toggleTheme}
      aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
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
