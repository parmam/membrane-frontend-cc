import { useI18n } from '@/i18n';

import { FunctionComponent, ReactNode } from 'react';

import useWindowSize from '@hooks/useWindowSize';
import useTheme from '@theme/useTheme';
import LanguageSelector from '@view/components/LanguageSelector';
import ThemeToggle from '@view/components/ThemeToggle';
import Box from '@view/elements/Box';
import Typography from '@view/elements/Typography';

import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = (props) => {
  const { isMobile } = useWindowSize();
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <Box className={styles.authLayoutContainer} bgcolor={theme.palette.background.default}>
      {/* Theme and language toggles in the top-right corner */}
      <Box className={styles.headerControls}>
        <LanguageSelector />
        <ThemeToggle />
      </Box>

      {/* Left side - will have background image later */}
      <Box className={styles.leftPanel} bgcolor={theme.palette.background.paper} />

      {/* Right side - form container */}
      <Box className={styles.rightPanel}>
        <Box className={styles.formContainer}>
          <Box marginBottom='2rem'>
            <Typography variant='h4' className={styles.authTitle}>
              {props.title}
            </Typography>
          </Box>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
