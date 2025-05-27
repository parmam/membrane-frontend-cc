import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import Table from './Table';
import styles from './Table.module.css';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { DEFAULT_VIRTUALIZED_CONFIG, VirtualizedListConfig } from './config';

// Extender el tipo Window para permitir el timeout
declare global {
  interface Window {
    scrollTimeout?: number;
    lastScrollTop?: number;
    debounceTimer?: ReturnType<typeof setTimeout>;
    resizeTimer?: ReturnType<typeof setTimeout>;
  }
}

interface VirtualizedTableProps<T> {
  data: T[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
  renderHead: () => ReactNode;
  renderRow: (item: T, index: number) => ReactNode;
  renderFooter?: (visibleData: T[], allData: T[], loading: boolean) => ReactNode;
  containerClassName?: string;
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

function VirtualizedTable<T>({
  data,
  className,
  config = {},
  renderHead,
  renderRow,
  renderFooter,
  containerClassName,
}: VirtualizedTableProps<T>) {
  // Merge provided config with default config, memoized to prevent unnecessary rerenders
  const mergedConfig = useMemo(() => {
    const merged = { ...DEFAULT_VIRTUALIZED_CONFIG, ...config };
    return merged;
  }, [config]);

  // Cantidad inicial de elementos a mostrar
  const initialVisibleCount = useMemo(() => mergedConfig.itemsPerPage, [mergedConfig.itemsPerPage]);

  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const isLoadingRef = useRef(false); // Referencia para evitar cargas simultáneas
  const requestIdRef = useRef(0); // Para identificar cada solicitud de carga
  const didInitialMountRef = useRef(false);
  const lastLoadTimeRef = useRef(0); // Referencia para controlar la frecuencia de cargas
  const initialLoadCompleteRef = useRef(false); // Referencia para la primera carga
  const MIN_LOAD_INTERVAL = 800; // Intervalo mínimo entre cargas en ms

  // Ref to store the latest scroll check function to avoid circular dependencies
  const checkIfNearBottomRef = useRef<() => void>(() => {});

  // Inicializamos contador de scroll
  if (typeof window !== 'undefined' && window.lastScrollTop === undefined) {
    window.lastScrollTop = 0;
  }

  // Restablecer displayCount cuando cambia itemsPerPage o los datos
  useEffect(() => {
    if (didInitialMountRef.current) {
      setDisplayCount(initialVisibleCount);
      initialLoadCompleteRef.current = false;
    } else {
      didInitialMountRef.current = true;
    }
  }, [initialVisibleCount, data]);

  // Función para cargar más elementos cuando se hace scroll hacia abajo
  const loadMoreItems = useCallback(
    (isPrefetch = false) => {
      const requestId = ++requestIdRef.current;
      const now = Date.now();

      // Verificar si podemos cargar más elementos
      if (isLoadingRef.current || displayCount >= data.length) {
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

      // Marcar como cargando
      isLoadingRef.current = true;
      if (!isPrefetch) {
        lastLoadTimeRef.current = now;
      }

      // Solo mostrar indicador de carga para cargas regulares, no para prefetch
      if (!isPrefetch) {
        setLoading(true);
      }

      // Calculamos cuántos elementos más cargar
      // Usar itemsPerPage directo de mergedConfig para asegurar consistencia
      const itemsToLoad = Math.min(mergedConfig.itemsPerPage, 10);
      const availableItems = data.length - displayCount;
      const itemsToActuallyLoad = Math.min(itemsToLoad, availableItems);

      // Verificamos si hay elementos para cargar
      if (itemsToActuallyLoad <= 0) {
        isLoadingRef.current = false;
        setLoading(false);
        return;
      }

      // Guardar scroll actual antes de cargar
      const currentScrollTop = containerRef.current?.scrollTop || 0;

      // Para prefetch, cargamos inmediatamente para mejorar la experiencia
      if (isPrefetch) {
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          return finalCount;
        });

        isLoadingRef.current = false;

        // Restaurar posición de scroll
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = currentScrollTop;
          }
        }, 50);

        return;
      }

      // Para cargas normales, simulamos una carga asíncrona
      setTimeout(() => {
        // Asegurarnos de que el componente sigue montado antes de actualizar el estado
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          return finalCount;
        });

        // Finalizar carga después de un pequeño retraso para que el usuario vea el indicador
        setTimeout(() => {
          setLoading(false);
          isLoadingRef.current = false;
          // Marcar que la primera carga ha completado
          initialLoadCompleteRef.current = true;

          // Restaurar posición de scroll
          if (containerRef.current) {
            containerRef.current.scrollTop = currentScrollTop;
          }

          // Verificar si debemos cargar más (en caso de que el usuario siga desplazándose rápidamente)
          // pero hacerlo con menos frecuencia para evitar cargas en cadena
          if (containerRef.current) {
            setTimeout(() => {
              if (checkIfNearBottomRef.current) {
                checkIfNearBottomRef.current();
              }
            }, 300); // Aumentado a 300ms para dar más tiempo
          }
        }, 200);
      }, 300);
    },
    [data.length, displayCount, mergedConfig.itemsPerPage],
  );

  // Verificar si estamos cerca del final del scroll
  const checkIfNearBottom = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Ensure we have valid measurements
    if (scrollHeight <= 0 || clientHeight <= 0) {
      return;
    }

    // Determinar dirección de scroll
    const lastScrollTop = window.lastScrollTop ?? 0;
    const direction =
      scrollTop > lastScrollTop ? 'down' : scrollTop < lastScrollTop ? 'up' : 'none';

    // Si la diferencia es muy pequeña, considerarlo como "sin cambio" para evitar detecciones falsas
    // Durante la primera carga, ser más permisivo con el umbral
    const MIN_SCROLL_DELTA = initialLoadCompleteRef.current ? 5 : 1;
    const scrollDelta = Math.abs(scrollTop - lastScrollTop);
    // Si estamos en la primera carga, forzar dirección "down" o "none" para evitar falsos "up"
    const effectiveDirection = !initialLoadCompleteRef.current
      ? scrollDelta < MIN_SCROLL_DELTA
        ? 'none'
        : 'down'
      : scrollDelta < MIN_SCROLL_DELTA
        ? 'none'
        : direction;

    // Actualizar último scrollTop
    window.lastScrollTop = scrollTop;

    // Calcular el espacio restante hasta el final del scroll
    const remainingScrollSpace = scrollHeight - (scrollTop + clientHeight);

    // Carga de más elementos solo si hay más por cargar
    // Importante: Forzar a true durante la primera verificación de scroll para asegurar que funcione
    const canLoadMore =
      !initialLoadCompleteRef.current || (displayCount < data.length && !isLoadingRef.current);

    // Verificar si debemos cargar más elementos basados en la cantidad restante
    const remainingItems = data.length - displayCount;
    const shouldLoadByRemainingItems =
      mergedConfig.useRemainingItemsThreshold &&
      remainingItems <= mergedConfig.remainingItemsThreshold;

    // Calcular porcentaje de scroll para todos los casos
    const scrollPercentage = Math.min(100, ((scrollTop + clientHeight) / scrollHeight) * 100);

    // Usar umbrales basados en píxeles si están explícitamente activados o si los porcentajes no funcionan bien
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

    // Usar un enfoque más estricto para evitar cargas innecesarias
    // 1. Dirección debe ser hacia abajo explícitamente (excepto en primera carga)
    // 2. Debe cumplir los umbrales configurados
    // 3. No debe estar cargando ya
    // 4. Debe haber pasado suficiente tiempo desde la última carga (excepto primera vez)
    if (
      ((effectiveDirection === 'down' && shouldLoad) ||
        shouldLoadByRemainingItems ||
        !initialLoadCompleteRef.current) &&
      canLoadMore &&
      canTriggerLoad
    ) {
      // Force update the state first to avoid race conditions
      setIsNearBottom(true);
      loadMoreItems(false); // Carga normal
    } else if (
      effectiveDirection === 'down' &&
      shouldPrefetch &&
      canLoadMore &&
      !shouldLoadByRemainingItems &&
      !isLoadingRef.current &&
      canTriggerLoad
    ) {
      // Prefetch - cargamos más elementos sin mostrar indicador de carga
      loadMoreItems(true); // Prefetch
    } else if ((shouldLoad || shouldLoadByRemainingItems) !== isNearBottom) {
      // Actualizar el estado si cambia
      setIsNearBottom(shouldLoad || shouldLoadByRemainingItems);
    }
  }, [
    data.length,
    displayCount,
    isNearBottom,
    loadMoreItems,
    mergedConfig.loadThresholdPercent,
    mergedConfig.prefetchThresholdPercent,
    mergedConfig.useRemainingItemsThreshold,
    mergedConfig.remainingItemsThreshold,
    mergedConfig.pixelBasedThreshold,
    mergedConfig.pixelBasedLoadThreshold,
    mergedConfig.pixelBasedPrefetchThreshold,
  ]);

  // Update the ref whenever the function changes
  useEffect(() => {
    checkIfNearBottomRef.current = checkIfNearBottom;
  }, [checkIfNearBottom]);

  // Versión con throttle del checkIfNearBottom para mejor rendimiento
  const throttledCheckIfNearBottom = useCallback(
    throttle(() => {
      checkIfNearBottom();
    }, 200), // 200ms de throttle para limitar la frecuencia de verificaciones
    [checkIfNearBottom],
  );

  // Manejar eventos de scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // Implementación directa del evento de scroll con throttling para mejor rendimiento
    const handleScroll = () => {
      // Usamos el método con throttle para evitar demasiadas verificaciones
      throttledCheckIfNearBottom();
    };

    // Registrar el evento de scroll directamente
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Hacer una comprobación inicial después de montar
    setTimeout(() => {
      if (containerRef.current) {
        checkIfNearBottom();
      }
    }, 100);

    // Limpieza
    return () => {
      container.removeEventListener('scroll', handleScroll);

      // Limpiar el debounce timer si existe
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [throttledCheckIfNearBottom, checkIfNearBottom]);

  // Forzar una comprobación cuando cambia el tamaño de la ventana
  useEffect(() => {
    // Función para manejar el redimensionamiento
    const handleResize = debounce(() => {
      // Forzar un nuevo cálculo después de que se redimensione la ventana
      if (containerRef.current) {
        checkIfNearBottom();
      }
    }, 200);

    // Registrar evento de redimensionamiento
    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [checkIfNearBottom]);

  // Hacer una comprobación cada vez que cambia displayCount para manejar carga continua si es necesario
  useEffect(() => {
    // Si acabamos de cargar más elementos, verificar si necesitamos cargar aún más
    // Pero lo hacemos con menos frecuencia para evitar cargas en cadena
    if (containerRef.current && displayCount < data.length && !isLoadingRef.current) {
      // Esperar un momento antes de verificar para evitar cargas múltiples simultáneas
      const timer = setTimeout(() => {
        checkIfNearBottom();
      }, 300); // Aumentado a 300ms para dar más tiempo entre verificaciones

      return () => {
        clearTimeout(timer);
      };
    }
  }, [displayCount, data.length, checkIfNearBottom]);

  // Elementos que serán mostrados según el scroll
  const visibleData = useMemo(() => data.slice(0, displayCount), [data, displayCount]);
  const hasMore = displayCount < data.length;

  // Default footer if none provided
  const defaultFooter = (
    <>
      {loading && (
        <tfoot>
          <tr className={styles.loadingRow}>
            <td colSpan={7} style={{ textAlign: 'center' }}>
              <div className={styles.loadingIndicator}></div>
            </td>
          </tr>
        </tfoot>
      )}

      {hasMore && !loading && (
        <tfoot>
          <tr>
            <td colSpan={7}>
              <div className={styles.scrollHint}>
                Desplázate hacia abajo para cargar más ({visibleData.length} de {data.length})
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );

  return (
    <div className={clsx(styles.tableWrapper, className)} style={{ overflow: 'hidden' }}>
      <div
        ref={containerRef}
        className={clsx(styles.tableContainer, containerClassName)}
        style={{
          height: `${mergedConfig.containerHeight}px`,
          maxHeight: `${mergedConfig.containerHeight}px`,
          overflowY: 'auto',
          overflowX: 'hidden', // Hide horizontal scrollbar
        }}
      >
        <Table className={styles.table}>
          <TableHead>{renderHead()}</TableHead>
          <TableBody>{visibleData.map((item, index) => renderRow(item, index))}</TableBody>
          {renderFooter ? renderFooter(visibleData, data, loading) : defaultFooter}
        </Table>
      </div>
    </div>
  );
}

export default VirtualizedTable;
