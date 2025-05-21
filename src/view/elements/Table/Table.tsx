import {
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
} from 'react';

import clsx from 'clsx';

import styles from './Table.module.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Table: FunctionComponent<TableProps> = ({ children, className, ...rest }) => {
  return (
    <table className={clsx(styles.table, className)} {...rest}>
      {children}
    </table>
  );
};

export default Table;
