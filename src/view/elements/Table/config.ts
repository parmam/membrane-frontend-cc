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
  /** Whether to use remaining items count instead of percentage for load threshold */
  useRemainingItemsThreshold: boolean;
  /** Number of remaining items before loading more (only used if useRemainingItemsThreshold is true) */
  remainingItemsThreshold: number;
  /** Whether to prioritize pixel-based thresholds over percentage-based ones */
  pixelBasedThreshold?: boolean;
  /** Number of pixels from bottom to trigger load (used when pixelBasedThreshold is true) */
  pixelBasedLoadThreshold?: number;
  /** Number of pixels from bottom to trigger prefetch (used when pixelBasedThreshold is true) */
  pixelBasedPrefetchThreshold?: number;
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
  useRemainingItemsThreshold: false,
  remainingItemsThreshold: 5,
  pixelBasedThreshold: false,
  pixelBasedLoadThreshold: 300,
  pixelBasedPrefetchThreshold: 600,
};

// For backward compatibility
export type TableConfig = VirtualizedListConfig;
export const DEFAULT_TABLE_CONFIG = DEFAULT_VIRTUALIZED_CONFIG;
