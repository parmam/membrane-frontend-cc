import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

import TableElement from '@view/elements/Table';
import { TableBody, TableContainer, TableHead } from '@view/elements/Table';

import styles from './Table.module.css';

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  renderHead: ReactNode;
  renderBody: ReactNode;
}

const Table: FunctionComponent<TableProps> = (props) => {
  const { renderHead, renderBody, ...rest } = props;
  return (
    <TableContainer {...rest}>
      <TableElement className={styles.table}>
        <TableHead>{renderHead}</TableHead>
        <TableBody>{renderBody}</TableBody>
      </TableElement>
    </TableContainer>
  );
};

export default Table;
