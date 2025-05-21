import { CSSProperties, FunctionComponent } from 'react';

import clsx from 'clsx';

import logo from '/@application/assets/images/logo.svg';

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
