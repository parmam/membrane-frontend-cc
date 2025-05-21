import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './ToggleButton.module.css';

type Size = 'small' | 'medium' | 'large';

export interface ToggleButtonProps<T = string>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  children?: ReactNode;
  value: T;
  selected?: boolean;
  disabled?: boolean;
  size?: Size;
  className?: string;
}

const ToggleButton = <T extends React.Key = string>({
  children,
  value,
  selected,
  disabled,
  size = 'medium',
  className,
  ...rest
}: ToggleButtonProps<T>) => {
  return (
    <button
      className={clsx(
        styles.toggleButton,
        {
          [styles.selected]: selected,
          [styles.disabled]: disabled,
          [styles[size]]: size,
        },
        className,
      )}
      value={value as unknown as string}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
