import { CSSProperties, ComponentType, FC, FunctionComponent, SVGProps } from 'react';

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './Icon.module.css';

type IconSize = 'small' | 'medium' | 'large';

export interface IconProps extends Omit<FontAwesomeIconProps, 'size' | 'icon'> {
  customSize?: IconSize;
  style?: CSSProperties;
  className?: string;
  svgIcon?: FC<SVGProps<SVGElement>> | ComponentType<SVGProps<SVGElement>>;
  icon?: FontAwesomeIconProps['icon'];
}

const Icon: FunctionComponent<IconProps> = ({
  customSize = 'medium',
  className,
  svgIcon: SvgIcon,
  ...props
}) => {
  if (SvgIcon) {
    return (
      <SvgIcon
        className={clsx(styles.icon, customSize && styles[customSize], className)}
        {...(props as SVGProps<SVGElement>)}
      />
    );
  }

  return (
    <FontAwesomeIcon
      className={clsx(styles.icon, customSize && styles[customSize], className)}
      {...(props as FontAwesomeIconProps)}
    />
  );
};

export default Icon;
