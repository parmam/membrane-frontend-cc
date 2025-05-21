import { ButtonHTMLAttributes, CSSProperties, FunctionComponent, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Button.module.css';

type ButtonVariant = 'text' | 'contained' | 'outlined';
type ButtonColor = 'primary' | 'secondary' | 'inherit';
type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  style?: CSSProperties;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
  const {
    children,
    className,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    startIcon,
    endIcon,
    style,
    ...rest
  } = props;

  const classNames = clsx(
    styles.button,
    styles[variant],
    styles[color],
    styles[size],
    {
      [styles.fullWidth]: fullWidth,
    },
    className,
  );

  return (
    <button className={classNames} disabled={disabled} style={style} {...rest}>
      {startIcon && <span style={{ marginRight: 8 }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ marginLeft: 8 }}>{endIcon}</span>}
    </button>
  );
};

export default Button;
