export interface TableConfig {
  /** Default items per page */
  itemsPerPage: number;
  /** Virtualization threshold - when to start virtualizing rows */
  virtualizationThreshold: number;
  /** Default height for virtualized table container (px) */
  tableHeight: number;
  /** Default row height for calculations (px) */
  rowHeight: number;
  /** Buffer rows above and below the visible area */
  bufferSize: number;
  /** Default page sizes for pagination selector */
  pageSizeOptions: number[];
  /** Enable/disable striped rows */
  striped: boolean;
  /** Enable/disable hover effect */
  hover: boolean;
  /** Enable/disable borders */
  bordered: boolean;
}

export const DEFAULT_TABLE_CONFIG: TableConfig = {
  itemsPerPage: 10,
  virtualizationThreshold: 50,
  tableHeight: 500,
  rowHeight: 48,
  bufferSize: 5,
  pageSizeOptions: [5, 10, 25, 50, 100],
  striped: true,
  hover: true,
  bordered: false,
};
