import { FunctionComponent, ReactNode } from 'react';

import useTheme from '@theme/useTheme';
import Box from '@view/elements/Box';
import Sidebar from '@view/prototypes/Sidebar/Sidebar';
import MainHeader from '@view/prototypes/headers/MainHeader';

import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
  const theme = useTheme();

  return (
    <Box className={styles.layoutContainer} bgcolor={theme.palette.background.default}>
      <Box className={styles.headerContainer}>
        <MainHeader title='navigation.home' />
      </Box>

      <Box className={styles.bodyContainer}>
        <Sidebar />
        <Box className={styles.contentContainer}>
          <Box className={styles.pageContent}>{props.children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
