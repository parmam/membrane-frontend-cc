import { CSSProperties, FunctionComponent, ReactNode, TableHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Table.module.css';

export interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const TableHead: FunctionComponent<TableHeadProps> = ({ children, className, ...rest }) => {
  return (
    <thead className={clsx(styles.tableHead, className)} {...rest}>
      {children}
    </thead>
  );
};

export default TableHead;
