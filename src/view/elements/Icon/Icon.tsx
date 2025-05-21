import { CSSProperties, FunctionComponent } from 'react';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './Icon.module.css';

type IconSize = 'small' | 'medium' | 'large';

export interface IconProps extends Omit<FontAwesomeIconProps, 'size'> {
  customSize?: IconSize;
  style?: CSSProperties;
  className?: string;
}

const Icon: FunctionComponent<IconProps> = ({ customSize = 'medium', className, ...props }) => {
  return (
    <FontAwesomeIcon
      className={clsx(styles.icon, customSize && styles[customSize], className)}
      {...props}
    />
  );
};

export default Icon;
