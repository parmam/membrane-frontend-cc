import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import useWindowSize from '@hooks/useWindowSize';
import useTheme from '@theme/useTheme';
import Box from '@view/elements/Box';
import MainHeader from '@view/prototypes/Headers/MainHeader/MainHeader';
import Sidebar from '@view/prototypes/Sidebar/Sidebar';

import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  const theme = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useWindowSize(768);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Box className={styles.layoutContainer} bgcolor={theme.palette.background.default}>
      <Box className={styles.headerContainer}>
        <MainHeader title='navigation.home' onShowMenu={isMobile ? toggleMobileMenu : undefined} />
      </Box>

      <Box className={styles.bodyContainer}>
        <div
          className={`${styles.sidebarWrapper} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
        >
          <Sidebar onItemClick={isMobile ? toggleMobileMenu : undefined} />
          {isMobile && isMobileMenuOpen && (
            <div className={styles.backdrop} onClick={toggleMobileMenu}></div>
          )}
        </div>
        <Box
          className={`${styles.contentContainer} ${isMobileMenuOpen ? styles.contentShifted : ''}`}
        >
          <Box className={styles.pageContent}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
