export interface VirtualizedListConfig {
  /** Default items per page */
  itemsPerPage: number;
  /** Virtualization threshold - when to start virtualizing rows */
  virtualizationThreshold: number;
  /** Default height for virtualized container (px) */
  containerHeight: number;
  /** Default item height for calculations (px) */
  itemHeight: number;
  /** Buffer items above and below the visible area */
  bufferSize: number;
  /** Default page sizes for pagination selector */
  pageSizeOptions: number[];
  /** Enable/disable striped items */
  striped: boolean;
  /** Enable/disable hover effect */
  hover: boolean;
  /** Enable/disable borders */
  bordered: boolean;
  /** Distance to bottom threshold for infinite scroll (px) */
  scrollThreshold: number;
  /** Percentage of items viewed before loading more (0-100) */
  loadThresholdPercent: number;
  /** Percentage of items viewed to start prefetching (0-100, should be less than loadThresholdPercent) */
  prefetchThresholdPercent: number;
}

// Default configuration for virtualized lists
export const DEFAULT_VIRTUALIZED_CONFIG: VirtualizedListConfig = {
  itemsPerPage: 15,
  virtualizationThreshold: 50,
  containerHeight: 600,
  itemHeight: 48,
  bufferSize: 5,
  pageSizeOptions: [10, 15, 25, 50, 100],
  striped: true,
  hover: true,
  bordered: false,
  scrollThreshold: 100,
  loadThresholdPercent: 90,
  prefetchThresholdPercent: 75,
};

// For backward compatibility
export type TableConfig = VirtualizedListConfig;
export const DEFAULT_TABLE_CONFIG = DEFAULT_VIRTUALIZED_CONFIG;
