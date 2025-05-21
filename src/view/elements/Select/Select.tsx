import { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Select.module.css';

export interface SelectProps<T = string | number>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  children?: ReactNode;
  onChange?: (value: T) => void;
}

const Select = <T extends string | number = string | number>(props: SelectProps<T>) => {
  const { onChange, label, error, helperText, children, className, ...rest } = props;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      // Convertir el valor a número si es un número, de lo contrario dejarlo como string
      const value = event.target.value;
      const convertedValue =
        !isNaN(Number(value)) && typeof rest.value === 'number'
          ? (Number(value) as unknown as T)
          : (value as unknown as T);

      onChange(convertedValue);
    }
  };

  const labelId = label ? `${label}-label`.replace(/\s+/g, '-').toLowerCase() : undefined;

  return (
    <div className={styles.formControl}>
      {label && (
        <label id={labelId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        aria-labelledby={labelId}
        className={clsx(styles.select, { [styles.error]: error }, className)}
        onChange={handleChange}
        {...rest}
      >
        {children}
      </select>
      {helperText && (
        <div className={clsx(styles.helperText, { [styles.errorText]: error })}>{helperText}</div>
      )}
    </div>
  );
};

export default Select;
