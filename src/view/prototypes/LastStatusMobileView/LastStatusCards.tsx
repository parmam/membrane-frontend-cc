import { useCallback, useEffect, useRef, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DEFAULT_VIRTUALIZED_CONFIG, VirtualizedListConfig } from '@view/elements/Table/config';
import { DeviceData } from '@view/prototypes/LastStatusTable/data';
import clsx from 'clsx';

import styles from './LastStatusCards.module.css';

// Extender el tipo Window para permitir el timeout
declare global {
  interface Window {
    scrollTimeout?: number;
    lastScrollTop?: number;
    debounceTimer?: ReturnType<typeof setTimeout>;
    resizeTimer?: ReturnType<typeof setTimeout>;
  }
}

// Función para debounce
const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  return (...args: Parameters<T>) => {
    if (window.debounceTimer) {
      clearTimeout(window.debounceTimer);
    }
    window.debounceTimer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

interface LastStatusCardsProps {
  data: DeviceData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
}

const LastStatusCards = ({ data, className, config = {} }: LastStatusCardsProps) => {
  // Merge provided config with default config
  const mergedConfig = { ...DEFAULT_VIRTUALIZED_CONFIG, ...config };

  // Initial items to show - we render all initially but will load more as user scrolls
  const initialVisibleCount = mergedConfig.itemsPerPage * 2;
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);

  // Calculate scroll threshold using config
  const calculateThreshold = useCallback(() => {
    // We can use the percentage threshold from config for consistency
    return mergedConfig.loadThresholdPercent;
  }, [mergedConfig.loadThresholdPercent]);

  // Visible data to render
  const visibleData = data.slice(0, displayCount);
  const hasMore = displayCount < data.length;

  // Function to load more items
  const loadMoreItems = useCallback(
    (isPrefetch = false) => {
      if (isLoadingRef.current || !hasMore) return;

      isLoadingRef.current = true;

      // Only show loading indicator for regular loads, not for prefetch
      if (!isPrefetch) {
        setLoading(true);
      }

      // Simulate async loading
      setTimeout(
        () => {
          setDisplayCount((prevCount) => {
            const newCount = prevCount + initialVisibleCount;
            return Math.min(newCount, data.length);
          });

          setLoading(false);
          isLoadingRef.current = false;
        },
        isPrefetch ? 100 : 300,
      ); // Faster for prefetch
    },
    [data.length, hasMore, initialVisibleCount],
  );

  // Handle scroll event on the window
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current || !hasMore) return;

      // Calculate current scroll position
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // Calculate the percentage of content viewed
      const scrollPercentage = ((scrollY + windowHeight) / documentHeight) * 100;

      // Determine if we should load or prefetch based on configured thresholds
      const shouldLoad = scrollPercentage >= mergedConfig.loadThresholdPercent;
      const shouldPrefetch =
        scrollPercentage >= mergedConfig.prefetchThresholdPercent &&
        scrollPercentage < mergedConfig.loadThresholdPercent;

      if (shouldLoad) {
        // Load more items with visible loading indicator
        loadMoreItems(false);
      } else if (shouldPrefetch) {
        // Prefetch items without showing loading indicator
        loadMoreItems(true);
      }
    };

    // Add scroll listener to window with debounce
    const debouncedHandleScroll = debounce(handleScroll, 150);
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [
    hasMore,
    loadMoreItems,
    mergedConfig.loadThresholdPercent,
    mergedConfig.prefetchThresholdPercent,
  ]);

  return (
    <div className={clsx(styles.cardsContainer, className)}>
      {visibleData.map((device) => (
        <div key={device.id} className={clsx(styles.card, device.critico && styles.criticalCard)}>
          <div className={styles.cardHeader}>
            <h3 className={styles.deviceName}>{device.dispositivo}</h3>
            {device.critico && (
              <FontAwesomeIcon icon={faCircleExclamation} className={styles.criticalIcon} />
            )}
          </div>

          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>TIPO</div>
              <div className={styles.infoValue}>{device.tipo}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>MARCA</div>
              <div className={styles.infoValue}>{device.marca}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>SITIO</div>
              <div className={styles.infoValue}>{device.sitio}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>FCO</div>
              <div className={styles.infoValue}>{device.fco}</div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span
              className={clsx(
                styles.statusIndicator,
                styles[`status${device.ultimoEstado.replace(/\s+/g, '')}`],
              )}
            >
              {device.ultimoEstado}
            </span>
          </div>
        </div>
      ))}

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingIndicator}></div>
        </div>
      )}

      {hasMore && !loading && (
        <div className={styles.scrollHint}>
          Desplázate hacia abajo para cargar más ({visibleData.length} de {data.length})
        </div>
      )}
    </div>
  );
};

export default LastStatusCards;
