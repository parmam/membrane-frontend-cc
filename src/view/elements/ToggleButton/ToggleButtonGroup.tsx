import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './ToggleButton.module.css';

type Size = 'small' | 'medium' | 'large';

export interface ToggleButtonGroupProps<T = unknown> extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  value?: T;
  exclusive?: boolean;
  size?: Size;
  className?: string;
}

const ToggleButtonGroup = <T extends React.Key = string>({
  children,
  value,
  exclusive = false,
  size = 'large',
  className,
  ...rest
}: ToggleButtonGroupProps<T>) => {
  return (
    <div className={clsx(styles.toggleButtonGroup, className)} {...rest}>
      {children}
    </div>
  );
};

export default ToggleButtonGroup;
