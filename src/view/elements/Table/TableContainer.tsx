import { CSSProperties, HTMLAttributes, ReactNode, Ref, forwardRef } from 'react';

import clsx from 'clsx';

import styles from './Table.module.css';

export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.tableContainer, className)} {...rest}>
        {children}
      </div>
    );
  },
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
