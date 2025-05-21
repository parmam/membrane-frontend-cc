import { CSSProperties, FunctionComponent, ReactNode, TableHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Table.module.css';

export interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const TableBody: FunctionComponent<TableBodyProps> = ({ children, className, ...rest }) => {
  return (
    <tbody className={clsx(styles.tableBody, className)} {...rest}>
      {children}
    </tbody>
  );
};

export default TableBody;
