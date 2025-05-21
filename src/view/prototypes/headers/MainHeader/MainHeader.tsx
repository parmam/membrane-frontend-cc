import { FunctionComponent } from 'react';

import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons/faXmarkCircle';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
}

const MainHeader: FunctionComponent<MainHeaderProps> = (props) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.leftContainer}>
        {props.onBack && (
          <button className={styles.button} onClick={props.onBack}>
            <Icon icon='arrow-left' color='var(--color-text-primary)' />
          </button>
        )}
        <Box color='var(--color-text-primary)'>logo</Box>
        <Typography variant='h6' className={styles.title}>
          {props.title}
        </Typography>
      </Box>
      <Box className={styles.rightContainer}>
        <ThemeToggle className={styles.themeToggle} />
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
