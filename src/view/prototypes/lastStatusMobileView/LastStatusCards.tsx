import { useCallback, useEffect, useRef, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { DEFAULT_TABLE_CONFIG } from '../../elements/Table/config';
import { DeviceData, dummyDeviceData } from '../LastStatusTable/data';
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

// Componente para la vista de tarjeta en móviles
const DeviceCard = ({ device }: { device: DeviceData }) => {
  return (
    <div className={clsx(styles.deviceCard, device.critico && styles.criticalCard)}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{device.dispositivo}</h3>
        {device.critico && (
          <FontAwesomeIcon icon={faCircleExclamation} className={styles.criticalIcon} />
        )}
      </div>

      <div className={styles.cardStatus}>
        <span
          className={clsx(
            styles.statusIndicator,
            styles[`status${device.ultimoEstado.replace(/\s+/g, '')}`],
          )}
        >
          {device.ultimoEstado}
        </span>
      </div>

      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Tipo</span>
          <span className={styles.cardDetailValue}>{device.tipo}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Marca</span>
          <span className={styles.cardDetailValue}>{device.marca}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Sitio</span>
          <span className={styles.cardDetailValue}>{device.sitio}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>FCO</span>
          <span className={styles.cardDetailValue}>{device.fco}</span>
        </div>
      </div>
    </div>
  );
};

interface LastStatusCardsProps {
  data: DeviceData[];
  className?: string;
}

const LastStatusCards = ({ data, className }: LastStatusCardsProps) => {
  // Initial items to show - we render all initially but will load more as user scrolls
  const initialVisibleCount = DEFAULT_TABLE_CONFIG.itemsPerPage * 2;
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);

  // Calculate scroll threshold at 70% of displayed items
  const calculateThreshold = useCallback(() => {
    return Math.floor(displayCount * 0.7);
  }, [displayCount]);

  // Visible data to render
  const visibleData = data.slice(0, displayCount);
  const hasMore = displayCount < data.length;

  // Function to load more items
  const loadMoreItems = useCallback(() => {
    if (isLoadingRef.current || !hasMore) return;

    isLoadingRef.current = true;
    setLoading(true);

    // Simulate async loading
    setTimeout(() => {
      setDisplayCount((prevCount) => {
        const newCount = prevCount + initialVisibleCount;
        return Math.min(newCount, data.length);
      });

      setLoading(false);
      isLoadingRef.current = false;
    }, 300);
  }, [data.length, hasMore, initialVisibleCount]);

  // Handle scroll event on the window
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingRef.current || !hasMore) return;

      // Calculate which item we're currently viewing
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // Check if we've scrolled to 70% of the current list
      const scrollPercentage = (scrollY + windowHeight) / documentHeight;
      if (scrollPercentage > 0.7) {
        loadMoreItems();
      }
    };

    // Add scroll listener to window
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loadMoreItems]);

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

      {loading && <div className={styles.loadingIndicator}>Cargando más dispositivos...</div>}

      {hasMore && !loading && (
        <div className={styles.scrollHint}>
          Desplázate hacia abajo para cargar más ({visibleData.length} de {data.length})
        </div>
      )}
    </div>
  );
};

export default LastStatusCards;
