import { useI18n } from '@/i18n';

import { FunctionComponent, ReactNode } from 'react';

import useWindowSize from '@hooks/useWindowSize';
import useTheme from '@theme/useTheme';
import LanguageSelector from '@view/components/LanguageSelector';
import ThemeToggle from '@view/components/ThemeToggle';
import Box from '@view/elements/Box';

interface AuthLayoutProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = (props) => {
  const { isMobile } = useWindowSize();
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <Box
      display='flex'
      flexDirection='row'
      height='100vh'
      width='100%'
      bgcolor={theme.palette.background.default}
      style={{
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* Theme and language toggles in the top-right corner */}
      <Box
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <LanguageSelector />
        <ThemeToggle />
      </Box>

      {/* Left side - will have background image later */}
      <Box
        display='flex'
        width='50%'
        height='100%'
        bgcolor={theme.palette.background.paper}
        style={{
          display: isMobile ? 'none' : 'flex',
          width: isMobile ? '100%' : '50%',
        }}
      />

      {/* Right side - form container */}
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='50%'
        height='100%'
        padding='2rem'
        style={{
          width: isMobile ? '100%' : '50%',
        }}
      >
        <Box display='flex' flexDirection='column' maxWidth='450px' width='100%'>
          <Box marginBottom='2rem'>
            <h1
              style={{
                color: theme.palette.text.primary,
                fontSize: '1.75rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {props.title}
            </h1>
          </Box>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
