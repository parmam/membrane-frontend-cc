import { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react';

import clsx from 'clsx';

import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: boolean;
  onChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, className, error, onChange, ...rest } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={clsx(styles.input, { [styles.error]: error }, className)}
        ref={ref}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
});

export default Input;
