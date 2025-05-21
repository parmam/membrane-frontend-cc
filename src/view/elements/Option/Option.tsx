import { FunctionComponent, OptionHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Option.module.css';

export interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children?: ReactNode;
  className?: string;
  value: string | number;
}

const Option: FunctionComponent<OptionProps> = ({ children, className, ...props }) => {
  return (
    <option className={clsx(styles.option, className)} {...props}>
      {children}
    </option>
  );
};

export default Option;
