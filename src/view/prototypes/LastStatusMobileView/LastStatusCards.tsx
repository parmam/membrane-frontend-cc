import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

// Función para throttle (limitar la frecuencia de ejecución)
const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

interface LastStatusCardsProps {
  data: DeviceData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
}

const LastStatusCards = ({ data, className, config = {} }: LastStatusCardsProps) => {
  // Merge provided config with default config, memoized para evitar re-renders innecesarios
  const mergedConfig = useMemo(() => {
    const merged = { ...DEFAULT_VIRTUALIZED_CONFIG, ...config };
    return merged;
  }, [config]);

  // Initial items to show - usar itemsPerPage directamente de la configuración
  const initialVisibleCount = useMemo(() => mergedConfig.itemsPerPage, [mergedConfig.itemsPerPage]);
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const requestIdRef = useRef(0); // Para identificar cada solicitud de carga
  const didInitialMountRef = useRef(false);
  const lastLoadTimeRef = useRef(0); // Referencia para controlar la frecuencia de cargas
  const initialLoadCompleteRef = useRef(false); // Referencia para la primera carga
  const MIN_LOAD_INTERVAL = 800; // Intervalo mínimo entre cargas en ms

  // Restablecer displayCount cuando cambia itemsPerPage o los datos
  useEffect(() => {
    if (didInitialMountRef.current) {
      setDisplayCount(initialVisibleCount);
      initialLoadCompleteRef.current = false;
    } else {
      didInitialMountRef.current = true;
    }
  }, [initialVisibleCount, data]);

  // Visible data to render - memoizado para evitar recálculos innecesarios
  const visibleData = useMemo(() => data.slice(0, displayCount), [data, displayCount]);
  const hasMore = displayCount < data.length;

  // Function to load more items
  const loadMoreItems = useCallback(
    (isPrefetch = false) => {
      const requestId = ++requestIdRef.current;
      const now = Date.now();

      if (isLoadingRef.current || !hasMore) {
        return;
      }

      // Limitar la frecuencia de cargas para evitar sobrecargas
      // Excepción: permitir siempre la primera carga
      if (
        !isPrefetch &&
        now - lastLoadTimeRef.current < MIN_LOAD_INTERVAL &&
        initialLoadCompleteRef.current
      ) {
        return;
      }

      isLoadingRef.current = true;
      if (!isPrefetch) {
        lastLoadTimeRef.current = now;
      }

      // Calcular cuántos elementos cargar
      const itemsToLoad = Math.min(mergedConfig.itemsPerPage, 10);
      const availableItems = data.length - displayCount;
      const itemsToActuallyLoad = Math.min(itemsToLoad, availableItems);

      // Only show loading indicator for regular loads, not for prefetch
      if (!isPrefetch) {
        setLoading(true);
      }

      // Para prefetch, cargamos inmediatamente
      if (isPrefetch) {
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          return finalCount;
        });

        isLoadingRef.current = false;
        return;
      }

      // Simulate async loading for regular loads
      setTimeout(() => {
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          return finalCount;
        });

        setTimeout(() => {
          setLoading(false);
          isLoadingRef.current = false;
          // Marcar que la primera carga ha completado
          initialLoadCompleteRef.current = true;
        }, 100);
      }, 300);
    },
    [data.length, displayCount, hasMore, mergedConfig.itemsPerPage],
  );

  // Handle scroll event on the window
  useEffect(() => {
    // Función interna para verificar el scroll
    const checkIfNearBottom = () => {
      if (isLoadingRef.current || (!hasMore && initialLoadCompleteRef.current)) {
        return;
      }

      // Calculate current scroll position
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // Determine scroll direction
      const lastScrollTop = window.lastScrollTop ?? 0;
      const direction = scrollY > lastScrollTop ? 'down' : scrollY < lastScrollTop ? 'up' : 'none';

      // Si la diferencia es muy pequeña, considerarlo como "sin cambio" para evitar detecciones falsas
      // Durante la primera carga, ser más permisivo con el umbral
      const MIN_SCROLL_DELTA = initialLoadCompleteRef.current ? 5 : 1;
      const scrollDelta = Math.abs(scrollY - lastScrollTop);
      // Si estamos en la primera carga, forzar dirección "down" o "none" para evitar falsos "up"
      const effectiveDirection = !initialLoadCompleteRef.current
        ? scrollDelta < MIN_SCROLL_DELTA
          ? 'none'
          : 'down'
        : scrollDelta < MIN_SCROLL_DELTA
          ? 'none'
          : direction;

      // Update last scroll position
      window.lastScrollTop = scrollY;

      // Calcular el espacio restante hasta el final del scroll
      const remainingScrollSpace = documentHeight - (scrollY + windowHeight);

      // Calculate the percentage of content viewed
      const scrollPercentage = ((scrollY + windowHeight) / documentHeight) * 100;

      // Usar umbrales basados en píxeles si están explícitamente activados
      const pixelBasedThresholdEnabled = mergedConfig.pixelBasedThreshold === true;

      // Obtener los umbrales de píxeles (usar valores por defecto si no están definidos)
      const pixelBasedLoadThreshold = mergedConfig.pixelBasedLoadThreshold || 300;
      const pixelBasedPrefetchThreshold = mergedConfig.pixelBasedPrefetchThreshold || 600;

      // Determinar si debemos cargar más basado en múltiples criterios
      const hasViewedThresholdPercent = scrollPercentage >= mergedConfig.loadThresholdPercent;
      const hasViewedThresholdPixels = remainingScrollSpace <= pixelBasedLoadThreshold;

      // Priorizar umbral de píxeles si está activado
      // Requerir dirección hacia abajo para evitar cargas innecesarias
      // En la primera carga, ser más permisivo
      const shouldLoad = !initialLoadCompleteRef.current
        ? hasViewedThresholdPixels || hasViewedThresholdPercent
        : pixelBasedThresholdEnabled
          ? hasViewedThresholdPixels && effectiveDirection === 'down'
          : hasViewedThresholdPercent && effectiveDirection === 'down';

      // Determinar si debemos prefetch
      const shouldPrefetchByPercent =
        scrollPercentage >= mergedConfig.prefetchThresholdPercent &&
        scrollPercentage < mergedConfig.loadThresholdPercent;
      const shouldPrefetchByPixels =
        remainingScrollSpace <= pixelBasedPrefetchThreshold &&
        remainingScrollSpace > pixelBasedLoadThreshold;

      // Priorizar umbral de píxeles para prefetch si está activado
      // Solo prefetch en dirección hacia abajo y si no estamos ya cargando
      const shouldPrefetch = pixelBasedThresholdEnabled
        ? shouldPrefetchByPixels && effectiveDirection === 'down' && !shouldLoad
        : shouldPrefetchByPercent && effectiveDirection === 'down' && !shouldLoad;

      // Verificar el tiempo desde la última carga para evitar cargas muy seguidas
      const now = Date.now();
      const timeSinceLastLoad = now - lastLoadTimeRef.current;
      // Ser más permisivo en la primera carga
      const canTriggerLoad =
        !initialLoadCompleteRef.current || timeSinceLastLoad >= MIN_LOAD_INTERVAL;

      if (
        (effectiveDirection === 'down' && shouldLoad && hasMore && canTriggerLoad) ||
        !initialLoadCompleteRef.current
      ) {
        loadMoreItems(false); // Carga normal
      } else if (
        effectiveDirection === 'down' &&
        shouldPrefetch &&
        hasMore &&
        !isLoadingRef.current &&
        canTriggerLoad
      ) {
        loadMoreItems(true); // Prefetch
      }
    };

    // Versión con throttle para mejorar el rendimiento
    const throttledCheckScroll = throttle(() => {
      checkIfNearBottom();
    }, 200);

    // Add scroll listener to window
    window.addEventListener('scroll', throttledCheckScroll, { passive: true });

    // Verificación inicial después de montar - esto asegura que se haga la primera carga
    setTimeout(() => {
      checkIfNearBottom();
    }, 100);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('scroll', throttledCheckScroll);
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [
    hasMore,
    loadMoreItems,
    mergedConfig.loadThresholdPercent,
    mergedConfig.prefetchThresholdPercent,
    mergedConfig.pixelBasedThreshold,
    mergedConfig.pixelBasedLoadThreshold,
    mergedConfig.pixelBasedPrefetchThreshold,
    data.length,
    displayCount,
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
