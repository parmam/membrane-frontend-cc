import { useI18n } from '@/i18n';

import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons/faXmarkCircle';
import { faBars, faSignOutAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from '@view/components/LanguageSelector';
import ThemeToggle from '@view/components/ThemeToggle';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Icon from '@view/elements/Icon';
import Typography from '@view/elements/Typography';

import styles from './MainHeader.module.css';

interface MainHeaderProps {
  title: string;
  onShowMenu?: () => void;
  onClose?: () => void;
  onBack?: () => void;
  userName?: string;
  userInitials?: string;
  onLogout?: () => void;
  onProfile?: () => void;
}

const MainHeader: FunctionComponent<MainHeaderProps> = (props) => {
  const { t } = useI18n();
  const userName = props.userName || 'Bruno Contartese';
  const userInitials = props.userInitials || 'BC';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (props.onLogout) {
      props.onLogout();
    } else {
      console.log('Logout clicked');
    }
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    if (props.onProfile) {
      props.onProfile();
    } else {
      console.log('Profile clicked');
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.leftContainer}>
        {props.onBack && (
          <button className={styles.button} onClick={props.onBack}>
            <Icon icon='arrow-left' color='var(--color-text-primary)' />
          </button>
        )}
        <Box className={styles.logo}>logo</Box>
        <Typography variant='h6' className={styles.title}>
          {t(props.title)}
        </Typography>
      </Box>
      <Box className={styles.rightContainer}>
        <LanguageSelector className={styles.languageSelector} />
        <ThemeToggle className={styles.themeToggle} />

        <div className={styles.userDropdownContainer} ref={dropdownRef}>
          <div className={styles.userInfo} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Box className={styles.avatar}>{userInitials}</Box>
            <Typography variant='body2' className={styles.username}>
              {userName}
            </Typography>
          </div>

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <Box className={styles.dropdownAvatar}>{userInitials}</Box>
                <Typography variant='body2' className={styles.dropdownUsername}>
                  {userName}
                </Typography>
              </div>

              <div className={styles.dropdownDivider}></div>

              <div className={styles.dropdownItem} onClick={handleProfile}>
                <Icon icon={faUserCircle} className={styles.dropdownIcon} color='inherit' />
                <Typography variant='body2'>{t('common.profile')}</Typography>
              </div>

              <div className={styles.dropdownItem} onClick={handleLogout}>
                <Icon icon={faSignOutAlt} className={styles.dropdownIcon} color='inherit' />
                <Typography variant='body2'>{t('auth.logout')}</Typography>
              </div>
            </div>
          )}
        </div>

        {props.onClose && !props.onShowMenu && (
          <button className={styles.button} onClick={props.onClose}>
            <Icon icon={faXmarkCircle} color='var(--color-primary-main)' customSize='large' />
          </button>
        )}
        {props.onShowMenu && !props.onClose && (
          <button className={styles.button} onClick={props.onShowMenu}>
            <Icon icon={faBars} color='var(--color-text-primary)' />
          </button>
        )}
      </Box>
    </Box>
  );
};

export default MainHeader;
