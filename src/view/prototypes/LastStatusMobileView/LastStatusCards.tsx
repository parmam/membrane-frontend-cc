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

    console.log(
      `[LastStatusCards] Inicialización con configuración: loadThresholdPercent=${merged.loadThresholdPercent}%, prefetchThresholdPercent=${merged.prefetchThresholdPercent}%, itemsPerPage=${merged.itemsPerPage}, pixelBasedThreshold=${merged.pixelBasedThreshold}`,
    );

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
  const MIN_LOAD_INTERVAL = 800; // Intervalo mínimo entre cargas en ms

  // Restablecer displayCount cuando cambia itemsPerPage o los datos
  useEffect(() => {
    if (didInitialMountRef.current) {
      console.log(
        `[LastStatusCards] Restablecer displayCount debido a cambios en configuración: ${initialVisibleCount}`,
      );
      setDisplayCount(initialVisibleCount);
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
        console.log(
          `[LastStatusCards][${requestId}] No se pueden cargar más elementos: isLoading=${isLoadingRef.current}, hasMore=${hasMore}`,
        );
        return;
      }

      // Limitar la frecuencia de cargas para evitar sobrecargas
      if (!isPrefetch && now - lastLoadTimeRef.current < MIN_LOAD_INTERVAL) {
        console.log(
          `[LastStatusCards][${requestId}] Demasiadas cargas seguidas, ignorando esta solicitud (última carga hace ${now - lastLoadTimeRef.current}ms)`,
        );
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

      console.log(
        `[LastStatusCards][${requestId}] ${isPrefetch ? 'PREFETCH' : 'CARGA'} de elementos: displayCount=${displayCount}, dataLength=${data.length}, cargaré ${itemsToActuallyLoad} elementos de ${availableItems} disponibles`,
      );

      // Only show loading indicator for regular loads, not for prefetch
      if (!isPrefetch) {
        setLoading(true);
        console.log(`[LastStatusCards][${requestId}] Mostrando indicador de carga`);
      }

      // Para prefetch, cargamos inmediatamente
      if (isPrefetch) {
        console.log(`[LastStatusCards][${requestId}] Ejecutando prefetch inmediato`);
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          console.log(
            `[LastStatusCards][${requestId}] Prefetch completado: ${prevCount} → ${finalCount} elementos`,
          );
          return finalCount;
        });

        isLoadingRef.current = false;
        return;
      }

      // Simulate async loading for regular loads
      console.log(`[LastStatusCards][${requestId}] Iniciando carga asíncrona (300ms)`);
      setTimeout(() => {
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          console.log(
            `[LastStatusCards][${requestId}] Actualizando displayCount: ${prevCount} → ${finalCount} elementos`,
          );
          return finalCount;
        });

        console.log(`[LastStatusCards][${requestId}] Esperando 100ms para finalizar la carga`);
        setTimeout(() => {
          setLoading(false);
          isLoadingRef.current = false;
          console.log(
            `[LastStatusCards][${requestId}] Carga finalizada, indicador de carga oculto`,
          );
        }, 100);
      }, 300);
    },
    [data.length, displayCount, hasMore, mergedConfig.itemsPerPage],
  );

  // Handle scroll event on the window
  useEffect(() => {
    // Función interna para verificar el scroll
    const checkIfNearBottom = () => {
      if (isLoadingRef.current || !hasMore) {
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
      const MIN_SCROLL_DELTA = 5;
      const scrollDelta = Math.abs(scrollY - lastScrollTop);
      const effectiveDirection = scrollDelta < MIN_SCROLL_DELTA ? 'none' : direction;

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
      const shouldLoad = pixelBasedThresholdEnabled
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

      console.log(
        `[LastStatusCards] SCROLL CHECK: dirección=${effectiveDirection} (delta=${scrollDelta}px), scrollY=${scrollY}px, windowHeight=${windowHeight}px, documentHeight=${documentHeight}px, scrollPercentage=${scrollPercentage.toFixed(2)}%, espacioRestante=${remainingScrollSpace}px` +
          `\n→ Modo píxeles: ${pixelBasedThresholdEnabled ? 'ACTIVADO' : 'DESACTIVADO'}, umbralCarga=${pixelBasedLoadThreshold}px, umbralPrefetch=${pixelBasedPrefetchThreshold}px` +
          `\n→ Criterios de carga: porcentaje=${hasViewedThresholdPercent}(${scrollPercentage.toFixed(2)}% >= ${mergedConfig.loadThresholdPercent}%), píxeles=${hasViewedThresholdPixels}(${remainingScrollSpace}px <= ${pixelBasedLoadThreshold}px)` +
          `\n→ Criterios de prefetch: porcentaje=${shouldPrefetchByPercent}, píxeles=${shouldPrefetchByPixels}` +
          `\n→ Estado: shouldLoad=${shouldLoad}, shouldPrefetch=${shouldPrefetch}, hasMore=${hasMore}(${displayCount}/${data.length}), isLoading=${isLoadingRef.current}`,
      );

      // Verificar el tiempo desde la última carga para evitar cargas muy seguidas
      const now = Date.now();
      const timeSinceLastLoad = now - lastLoadTimeRef.current;
      const canTriggerLoad = timeSinceLastLoad >= MIN_LOAD_INTERVAL;

      if (effectiveDirection === 'down' && shouldLoad && hasMore && canTriggerLoad) {
        let triggerReason = 'desconocido';
        if (pixelBasedThresholdEnabled && hasViewedThresholdPixels) {
          triggerReason = `umbral de píxeles (${remainingScrollSpace}px <= ${pixelBasedLoadThreshold}px)`;
        } else if (hasViewedThresholdPercent) {
          triggerReason = `porcentaje de scroll (${scrollPercentage.toFixed(2)}% >= ${mergedConfig.loadThresholdPercent}%)`;
        }

        console.log(`[LastStatusCards] ⚡ CARGANDO MÁS ELEMENTOS debido a: ${triggerReason}`);
        loadMoreItems(false); // Carga normal
      } else if (
        effectiveDirection === 'down' &&
        shouldPrefetch &&
        hasMore &&
        !isLoadingRef.current &&
        canTriggerLoad
      ) {
        let prefetchReason = 'desconocido';
        if (pixelBasedThresholdEnabled && shouldPrefetchByPixels) {
          prefetchReason = `umbral de píxeles (${remainingScrollSpace}px <= ${pixelBasedPrefetchThreshold}px)`;
        } else if (shouldPrefetchByPercent) {
          prefetchReason = `porcentaje de scroll (${scrollPercentage.toFixed(2)}% >= ${mergedConfig.prefetchThresholdPercent}%)`;
        }

        console.log(`[LastStatusCards] 🔄 PREFETCH DE ELEMENTOS debido a: ${prefetchReason}`);
        loadMoreItems(true); // Prefetch
      } else if (!canTriggerLoad && shouldLoad) {
        console.log(
          `[LastStatusCards] Ignorando carga porque pasó poco tiempo desde la última (${timeSinceLastLoad}ms < ${MIN_LOAD_INTERVAL}ms)`,
        );
      }
    };

    // Versión con throttle para mejorar el rendimiento
    const throttledCheckScroll = throttle(() => {
      console.log('[LastStatusCards] Ejecutando verificación de scroll con throttle (200ms)');
      checkIfNearBottom();
    }, 200);

    // Add scroll listener to window
    console.log('[LastStatusCards] Registrando evento de scroll en window');
    window.addEventListener('scroll', throttledCheckScroll, { passive: true });

    // Verificación inicial después de montar
    setTimeout(() => {
      console.log(
        '[LastStatusCards] Realizando verificación inicial de scroll después del montaje',
      );
      checkIfNearBottom();
    }, 100);

    // Limpieza al desmontar
    return () => {
      console.log('[LastStatusCards] Limpiando eventos de scroll');
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

  console.log(
    `[LastStatusCards] Renderizando cards con ${visibleData.length}/${data.length} elementos, hasMore=${hasMore}, loading=${loading}`,
  );

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
