import { CSSProperties, FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './Table.module.css';

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const TableContainer: FunctionComponent<TableContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={clsx(styles.tableContainer, className)} {...rest}>
      {children}
    </div>
  );
};

export default TableContainer;
