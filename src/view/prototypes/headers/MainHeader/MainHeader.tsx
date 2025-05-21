import { useI18n } from '@/i18n';

import { FunctionComponent } from 'react';

import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons/faXmarkCircle';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
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
}

const MainHeader: FunctionComponent<MainHeaderProps> = (props) => {
  const { t } = useI18n();
  const userName = props.userName || 'Bruno Contartese';
  const userInitials = props.userInitials || 'BC';

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

        <Box className={styles.userInfo}>
          <Box className={styles.avatar}>{userInitials}</Box>
          <Typography variant='body2' className={styles.username}>
            {userName}
          </Typography>
        </Box>

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
