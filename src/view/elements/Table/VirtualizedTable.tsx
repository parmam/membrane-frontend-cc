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

    // Log configuration at initialization
    console.log(
      `[VirtualizedTable] Inicialización con configuración: useRemainingItemsThreshold=${merged.useRemainingItemsThreshold}, remainingItemsThreshold=${merged.remainingItemsThreshold}, loadThresholdPercent=${merged.loadThresholdPercent}, prefetchThresholdPercent=${merged.prefetchThresholdPercent}, containerHeight=${merged.containerHeight}px, itemsPerPage=${merged.itemsPerPage}, pixelBasedThreshold=${merged.pixelBasedThreshold}`,
    );

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
      console.log(
        `[VirtualizedTable] Restablecer displayCount debido a cambios en configuración: ${initialVisibleCount}`,
      );
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
        console.log(
          `[VirtualizedTable][${requestId}] No se pueden cargar más elementos: isLoading=${isLoadingRef.current}, displayCount=${displayCount}/${data.length}`,
        );
        return;
      }

      // Limitar la frecuencia de cargas para evitar sobrecargas
      // Excepción: permitir siempre la primera carga
      if (
        !isPrefetch &&
        now - lastLoadTimeRef.current < MIN_LOAD_INTERVAL &&
        initialLoadCompleteRef.current
      ) {
        console.log(
          `[VirtualizedTable][${requestId}] Demasiadas cargas seguidas, ignorando esta solicitud (última carga hace ${now - lastLoadTimeRef.current}ms)`,
        );
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
        console.log(`[VirtualizedTable][${requestId}] Mostrando indicador de carga`);
      }

      // Calculamos cuántos elementos más cargar
      // Usar itemsPerPage directo de mergedConfig para asegurar consistencia
      const itemsToLoad = Math.min(mergedConfig.itemsPerPage, 10);
      const availableItems = data.length - displayCount;
      const itemsToActuallyLoad = Math.min(itemsToLoad, availableItems);

      console.log(
        `[VirtualizedTable][${requestId}] ${isPrefetch ? 'PREFETCH' : 'CARGA'} de elementos: displayCount=${displayCount}, dataLength=${data.length}, cargaré ${itemsToActuallyLoad} elementos de ${availableItems} disponibles`,
      );

      // Verificamos si hay elementos para cargar
      if (itemsToActuallyLoad <= 0) {
        isLoadingRef.current = false;
        setLoading(false);
        console.log(`[VirtualizedTable][${requestId}] No hay elementos nuevos para cargar`);
        return;
      }

      // Guardar scroll actual antes de cargar
      const currentScrollTop = containerRef.current?.scrollTop || 0;
      console.log(
        `[VirtualizedTable][${requestId}] Posición de scroll actual: ${currentScrollTop}px`,
      );

      // Para prefetch, cargamos inmediatamente para mejorar la experiencia
      if (isPrefetch) {
        console.log(`[VirtualizedTable][${requestId}] Ejecutando prefetch inmediato`);
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          console.log(
            `[VirtualizedTable][${requestId}] Prefetch completado: ${prevCount} → ${finalCount} elementos`,
          );
          return finalCount;
        });

        isLoadingRef.current = false;

        // Restaurar posición de scroll
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = currentScrollTop;
            console.log(
              `[VirtualizedTable][${requestId}] Scroll restaurado a ${currentScrollTop}px después de prefetch`,
            );
          }
        }, 50);

        return;
      }

      // Para cargas normales, simulamos una carga asíncrona
      console.log(`[VirtualizedTable][${requestId}] Iniciando carga asíncrona (300ms)`);
      setTimeout(() => {
        // Asegurarnos de que el componente sigue montado antes de actualizar el estado
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          const finalCount = Math.min(newCount, data.length);
          console.log(
            `[VirtualizedTable][${requestId}] Actualizando displayCount: ${prevCount} → ${finalCount} elementos`,
          );
          return finalCount;
        });

        // Finalizar carga después de un pequeño retraso para que el usuario vea el indicador
        console.log(`[VirtualizedTable][${requestId}] Esperando 200ms para finalizar la carga`);
        setTimeout(() => {
          setLoading(false);
          isLoadingRef.current = false;
          // Marcar que la primera carga ha completado
          initialLoadCompleteRef.current = true;

          console.log(
            `[VirtualizedTable][${requestId}] Carga finalizada, indicador de carga oculto`,
          );

          // Restaurar posición de scroll
          if (containerRef.current) {
            containerRef.current.scrollTop = currentScrollTop;
            console.log(
              `[VirtualizedTable][${requestId}] Scroll restaurado a ${currentScrollTop}px después de carga`,
            );
          }

          // Verificar si debemos cargar más (en caso de que el usuario siga desplazándose rápidamente)
          // pero hacerlo con menos frecuencia para evitar cargas en cadena
          if (containerRef.current) {
            setTimeout(() => {
              console.log(
                `[VirtualizedTable][${requestId}] Verificando si se necesitan más elementos después de la carga`,
              );
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
      console.log('[VirtualizedTable] No se puede verificar scroll: containerRef.current es null');
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Ensure we have valid measurements
    if (scrollHeight <= 0 || clientHeight <= 0) {
      console.log('[VirtualizedTable] Dimensiones inválidas: scrollHeight o clientHeight <= 0');
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

    // Registrar en consola los valores de scroll para depuración
    console.log(
      `[VirtualizedTable] SCROLL CHECK: dirección=${effectiveDirection} (delta=${scrollDelta}px), scrollTop=${scrollTop}px, scrollHeight=${scrollHeight}px, clientHeight=${clientHeight}px, scrollPercentage=${scrollPercentage.toFixed(2)}%, espacioRestante=${remainingScrollSpace}px` +
        `\n→ Modo píxeles: ${pixelBasedThresholdEnabled ? 'ACTIVADO' : 'DESACTIVADO'}, umbralCarga=${pixelBasedLoadThreshold}px, umbralPrefetch=${pixelBasedPrefetchThreshold}px` +
        `\n→ Criterios de carga: porcentaje=${hasViewedThresholdPercent}(${scrollPercentage.toFixed(2)}% >= ${mergedConfig.loadThresholdPercent}%), píxeles=${hasViewedThresholdPixels}(${remainingScrollSpace}px <= ${pixelBasedLoadThreshold}px)` +
        `\n→ Criterios de prefetch: porcentaje=${shouldPrefetchByPercent}, píxeles=${shouldPrefetchByPixels}` +
        `\n→ Estado: shouldLoad=${shouldLoad}, shouldPrefetch=${shouldPrefetch}, canLoadMore=${canLoadMore}(${displayCount}/${data.length}), isLoading=${isLoadingRef.current}, primeraVez=${!initialLoadCompleteRef.current}`,
    );

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
      let triggerReason = 'desconocido';
      if (!initialLoadCompleteRef.current) {
        triggerReason = 'primera carga';
      } else if (shouldLoadByRemainingItems) {
        triggerReason = `elementos restantes (${remainingItems} <= ${mergedConfig.remainingItemsThreshold})`;
      } else if (pixelBasedThresholdEnabled && hasViewedThresholdPixels) {
        triggerReason = `umbral de píxeles (${remainingScrollSpace}px <= ${pixelBasedLoadThreshold}px)`;
      } else if (hasViewedThresholdPercent) {
        triggerReason = `porcentaje de scroll (${scrollPercentage.toFixed(2)}% >= ${mergedConfig.loadThresholdPercent}%)`;
      }

      console.log(`[VirtualizedTable] ⚡ CARGANDO MÁS ELEMENTOS debido a: ${triggerReason}`);

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
      let prefetchReason = 'desconocido';
      if (pixelBasedThresholdEnabled && shouldPrefetchByPixels) {
        prefetchReason = `umbral de píxeles (${remainingScrollSpace}px <= ${pixelBasedPrefetchThreshold}px)`;
      } else if (shouldPrefetchByPercent) {
        prefetchReason = `porcentaje de scroll (${scrollPercentage.toFixed(2)}% >= ${mergedConfig.prefetchThresholdPercent}%)`;
      }

      console.log(`[VirtualizedTable] 🔄 PREFETCH DE ELEMENTOS debido a: ${prefetchReason}`);

      // Prefetch - cargamos más elementos sin mostrar indicador de carga
      loadMoreItems(true); // Prefetch
    } else if ((shouldLoad || shouldLoadByRemainingItems) !== isNearBottom) {
      // Actualizar el estado si cambia
      console.log(
        `[VirtualizedTable] Actualizando estado isNearBottom: ${isNearBottom} → ${shouldLoad || shouldLoadByRemainingItems}`,
      );
      setIsNearBottom(shouldLoad || shouldLoadByRemainingItems);
    } else if (!canTriggerLoad && shouldLoad) {
      console.log(
        `[VirtualizedTable] Ignorando carga porque pasó poco tiempo desde la última (${timeSinceLastLoad}ms < ${MIN_LOAD_INTERVAL}ms)`,
      );
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
    console.log('[VirtualizedTable] Función checkIfNearBottom actualizada en referencia');
  }, [checkIfNearBottom]);

  // Versión con throttle del checkIfNearBottom para mejor rendimiento
  const throttledCheckIfNearBottom = useCallback(
    throttle(() => {
      console.log('[VirtualizedTable] Ejecutando verificación de scroll con throttle (200ms)');
      checkIfNearBottom();
    }, 200), // 200ms de throttle para limitar la frecuencia de verificaciones
    [checkIfNearBottom],
  );

  // Manejar eventos de scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      console.log(
        '[VirtualizedTable] No se pueden registrar eventos de scroll: contenedor no disponible',
      );
      return;
    }

    // Log container dimensions once for debugging
    console.log(
      `[VirtualizedTable] DIMENSIONES DEL CONTENEDOR: altura=${container.offsetHeight}px, clientHeight=${container.clientHeight}px, scrollHeight=${container.scrollHeight}px, estilo={height:${container.style.height}, maxHeight:${container.style.maxHeight}, overflowY:${container.style.overflowY}}`,
    );

    // Implementación directa del evento de scroll con throttling para mejor rendimiento
    const handleScroll = () => {
      // Log basic scroll info
      if (container) {
        const scrollPercentage = (
          ((container.scrollTop + container.clientHeight) / container.scrollHeight) *
          100
        ).toFixed(2);
        console.log(
          `[VirtualizedTable] EVENTO SCROLL: scrollTop=${container.scrollTop}px, scrollHeight=${container.scrollHeight}px, clientHeight=${container.clientHeight}px, scrollPercentage=${scrollPercentage}%`,
        );
      }

      // Usamos el método con throttle para evitar demasiadas verificaciones
      throttledCheckIfNearBottom();
    };

    // Registrar el evento de scroll directamente
    console.log('[VirtualizedTable] Registrando evento de scroll en el contenedor');
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Hacer una comprobación inicial después de montar
    setTimeout(() => {
      if (containerRef.current) {
        console.log(
          '[VirtualizedTable] Realizando verificación inicial de scroll después del montaje',
        );
        checkIfNearBottom();
      }
    }, 100);

    // Limpieza
    return () => {
      console.log('[VirtualizedTable] Limpiando eventos de scroll');
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
        console.log(
          '[VirtualizedTable] Redimensionamiento de ventana detectado, verificando scroll',
        );
        checkIfNearBottom();
      }
    }, 200);

    // Registrar evento de redimensionamiento
    console.log('[VirtualizedTable] Registrando evento de redimensionamiento de ventana');
    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      console.log('[VirtualizedTable] Limpiando evento de redimensionamiento');
      window.removeEventListener('resize', handleResize);
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [checkIfNearBottom]);

  // Hacer una comprobación cada vez que cambia displayCount para manejar carga continua si es necesario
  useEffect(() => {
    console.log(`[VirtualizedTable] displayCount cambió a ${displayCount}/${data.length}`);

    // Si acabamos de cargar más elementos, verificar si necesitamos cargar aún más
    // Pero lo hacemos con menos frecuencia para evitar cargas en cadena
    if (containerRef.current && displayCount < data.length && !isLoadingRef.current) {
      // Esperar un momento antes de verificar para evitar cargas múltiples simultáneas
      const timer = setTimeout(() => {
        console.log(
          '[VirtualizedTable] Verificando si se necesitan más elementos después de cambiar displayCount',
        );
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

  console.log(
    `[VirtualizedTable] Renderizando tabla con ${visibleData.length}/${data.length} elementos, hasMore=${hasMore}, loading=${loading}`,
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
