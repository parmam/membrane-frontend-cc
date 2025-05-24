import { CSSProperties, FunctionComponent } from 'react';

import logo from '@assets/images/logo.svg';
import clsx from 'clsx';

import styles from './Logo.module.css';

type LogoSize = 'small' | 'medium' | 'large';

export interface LogoProps {
  size?: LogoSize;
  className?: string;
  style?: CSSProperties;
}

const Logo: FunctionComponent<LogoProps> = ({ size = 'medium', className, style }) => {
  return (
    <img
      src={logo}
      className={clsx(styles.logo, size && styles[size], className)}
      alt='logo'
      style={style}
    />
  );
};

export default Logo;
