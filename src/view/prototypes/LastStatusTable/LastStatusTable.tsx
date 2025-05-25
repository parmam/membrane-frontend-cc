import { useCallback, useEffect, useRef, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@view/elements/Table';
import { TableBody, TableHead } from '@view/elements/Table';
import { DEFAULT_VIRTUALIZED_CONFIG, VirtualizedListConfig } from '@view/elements/Table/config';
import LastStatusCards from '@view/prototypes/LastStatusMobileView/LastStatusCards';
import clsx from 'clsx';

import styles from './LastStatusTable.module.css';
import { DeviceData, dummyDeviceData } from './data';

// Extender el tipo Window para permitir el timeout
declare global {
  interface Window {
    scrollTimeout?: number;
    lastScrollTop?: number;
    debounceTimer?: ReturnType<typeof setTimeout>;
    resizeTimer?: ReturnType<typeof setTimeout>;
  }
}

interface LastStatusTableProps {
  data?: DeviceData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
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

// Media query para detección de móviles
const MOBILE_BREAKPOINT = 768;

// Verificar si es vista móvil
const isMobileViewport = () => {
  return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
};

const LastStatusTable = ({
  data = dummyDeviceData,
  className,
  config = {},
}: LastStatusTableProps) => {
  // Merge provided config with default config
  const mergedConfig = { ...DEFAULT_VIRTUALIZED_CONFIG, ...config };

  // Cantidad inicial de elementos a mostrar - aumentamos para crear scroll
  const initialVisibleCount = mergedConfig.itemsPerPage * 2; // Doubled to ensure scrolling
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const isLoadingRef = useRef(false); // Referencia para evitar cargas simultáneas
  const [isMobileView, setIsMobileView] = useState(isMobileViewport());

  // Ref to store the latest scroll check function to avoid circular dependencies
  const checkIfNearBottomRef = useRef<() => void>(() => {});

  // Inicializamos contador de scroll
  if (typeof window !== 'undefined' && window.lastScrollTop === undefined) {
    window.lastScrollTop = 0;
  }

  // Detectar vista móvil al cargar y en resize
  useEffect(() => {
    const checkMobileView = () => {
      const shouldBeMobile = isMobileViewport();

      if (shouldBeMobile !== isMobileView) {
        console.log(`Cambiando a vista ${shouldBeMobile ? 'móvil' : 'escritorio'}`);
        setIsMobileView(shouldBeMobile);
      }
    };

    // Comprobar al inicio
    checkMobileView();

    // Función para manejar cambios de tamaño con throttling
    const handleResize = () => {
      if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
      }

      window.resizeTimer = setTimeout(() => {
        checkMobileView();
      }, 100);
    };

    // Agregar listener para resize
    window.addEventListener('resize', handleResize);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.resizeTimer) {
        clearTimeout(window.resizeTimer);
      }
    };
  }, [isMobileView]);

  // Función para cargar más elementos cuando se hace scroll hacia abajo
  const loadMoreItems = useCallback(
    (isPrefetch = false) => {
      // Verificar si podemos cargar más elementos
      if (isLoadingRef.current || displayCount >= data.length) {
        return;
      }

      // Marcar como cargando
      isLoadingRef.current = true;

      // Solo mostrar indicador de carga para cargas regulares, no para prefetch
      if (!isPrefetch) {
        setLoading(true);
      }

      // Calculamos cuántos elementos más cargar
      const itemsToLoad = initialVisibleCount;
      const availableItems = data.length - displayCount;
      const itemsToActuallyLoad = Math.min(itemsToLoad, availableItems);

      // Verificamos si hay elementos para cargar
      if (itemsToActuallyLoad <= 0) {
        isLoadingRef.current = false;
        setLoading(false);
        return;
      }

      // Para prefetch, cargamos inmediatamente para mejorar la experiencia
      if (isPrefetch) {
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          return Math.min(newCount, data.length);
        });
        isLoadingRef.current = false;
        return;
      }

      // Para cargas normales, simulamos una carga asíncrona
      setTimeout(() => {
        // Asegurarnos de que el componente sigue montado antes de actualizar el estado
        setDisplayCount((prevCount) => {
          const newCount = prevCount + itemsToLoad;
          return Math.min(newCount, data.length);
        });

        // Finalizar carga después de un pequeño retraso para que el usuario vea el indicador
        setTimeout(() => {
          setLoading(false);
          isLoadingRef.current = false;

          // Verificar si debemos cargar más (en caso de que el usuario siga desplazándose rápidamente)
          if (containerRef.current) {
            setTimeout(() => {
              if (checkIfNearBottomRef.current) {
                checkIfNearBottomRef.current();
              }
            }, 100);
          }
        }, 200);
      }, 300);
    },
    [data.length, displayCount, initialVisibleCount],
  );

  // Verificar si estamos cerca del final del scroll
  const checkIfNearBottom = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Ensure we have valid measurements
    if (scrollHeight <= 0 || clientHeight <= 0) return;

    // Determinar dirección de scroll
    const lastScrollTop = window.lastScrollTop ?? 0;
    const direction =
      scrollTop > lastScrollTop ? 'down' : scrollTop < lastScrollTop ? 'up' : 'none';

    // Actualizar último scrollTop
    window.lastScrollTop = scrollTop;

    // Calcular qué porcentaje del contenido ha sido visto
    const scrollPercentage = Math.min(100, ((scrollTop + clientHeight) / scrollHeight) * 100);

    // Verificar si hemos visto el porcentaje configurado de los elementos
    const hasViewedThresholdPercent = scrollPercentage >= mergedConfig.loadThresholdPercent;
    const shouldPrefetch =
      scrollPercentage >= mergedConfig.prefetchThresholdPercent &&
      scrollPercentage < mergedConfig.loadThresholdPercent;

    // Carga de más elementos solo si hay más por cargar
    const canLoadMore = displayCount < data.length && !isLoadingRef.current;

    // Usar un enfoque más simple y directo similar al mobile
    if (direction === 'down' && hasViewedThresholdPercent && canLoadMore) {
      // Force update the state first to avoid race conditions
      setIsNearBottom(true);
      loadMoreItems(false); // Carga normal
    } else if (direction === 'down' && shouldPrefetch && canLoadMore) {
      // Prefetch - cargamos más elementos sin mostrar indicador de carga
      loadMoreItems(true); // Prefetch
    } else if (hasViewedThresholdPercent !== isNearBottom) {
      // Actualizar el estado si cambia
      setIsNearBottom(hasViewedThresholdPercent);
    }
  }, [
    data.length,
    displayCount,
    isNearBottom,
    loadMoreItems,
    mergedConfig.loadThresholdPercent,
    mergedConfig.prefetchThresholdPercent,
  ]);

  // Update the ref whenever the function changes
  useEffect(() => {
    checkIfNearBottomRef.current = checkIfNearBottom;
  }, [checkIfNearBottom]);

  // Versión con debounce del checkIfNearBottom
  const debouncedCheckIfNearBottom = useCallback(
    debounce(() => {
      checkIfNearBottom();
    }, 150), // 150ms de debounce para evitar múltiples llamadas
    [checkIfNearBottom],
  );

  // Manejar eventos de scroll
  useEffect(() => {
    // Skip for mobile view
    if (isMobileView) return;

    const container = containerRef.current;
    if (!container) return;

    // Implementación directa del evento de scroll con throttling para mejor rendimiento
    const handleScroll = () => {
      // Usamos el método con debounce
      debouncedCheckIfNearBottom();
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
  }, [debouncedCheckIfNearBottom, isMobileView, checkIfNearBottom]);

  // Forzar una comprobación cuando cambia el tamaño de la ventana
  useEffect(() => {
    // Skip for mobile view
    if (isMobileView) return;

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
  }, [checkIfNearBottom, isMobileView]);

  // Hacer una comprobación cada vez que cambia displayCount para manejar carga continua si es necesario
  useEffect(() => {
    // Solo para vista de escritorio
    if (isMobileView) return;

    // Si acabamos de cargar más elementos, verificar si necesitamos cargar aún más
    // Esto es útil cuando el usuario está desplazándose muy rápidamente
    if (containerRef.current && displayCount < data.length && !isLoadingRef.current) {
      // Esperar un momento antes de verificar para evitar cargas múltiples simultáneas
      const timer = setTimeout(() => {
        checkIfNearBottom();
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [displayCount, data.length, isMobileView, checkIfNearBottom]);

  // Elementos que serán mostrados según el scroll
  const visibleData = data.slice(0, displayCount);
  const hasMore = displayCount < data.length;

  // Si es vista móvil, renderizamos el componente LastStatusCards
  if (isMobileView) {
    return <LastStatusCards data={data} className={className} config={mergedConfig} />;
  }

  // Vista de escritorio con tabla
  return (
    <div className={clsx(styles.lastStatusTableWrapper, className)} style={{ overflow: 'hidden' }}>
      <div
        ref={containerRef}
        className={styles.tableContainer}
        style={{
          height: `${mergedConfig.containerHeight}px`,
          maxHeight: `${mergedConfig.containerHeight}px`,
          overflowY: 'auto',
          overflowX: 'hidden', // Hide horizontal scrollbar
        }}
      >
        <Table className={styles.table}>
          <TableHead>
            <tr>
              <th className={styles.tableHeadCell} style={{ width: '15%' }}>
                DISPOSITIVOS
              </th>
              <th className={styles.tableHeadCell} style={{ width: '12%' }}>
                TIPO
              </th>
              <th className={styles.tableHeadCell} style={{ width: '12%' }}>
                MARCA
              </th>
              <th className={styles.tableHeadCell} style={{ width: '15%' }}>
                SITIO
              </th>
              <th className={styles.tableHeadCell} style={{ width: '15%' }}>
                FCO
              </th>
              <th className={styles.tableHeadCell} style={{ width: '18%' }}>
                ULTIMO ESTADO
              </th>
              <th className={styles.tableHeadCell} style={{ width: '8%', textAlign: 'center' }}>
                CRITICO
              </th>
            </tr>
          </TableHead>
          <TableBody>
            {visibleData.map((row) => (
              <tr key={row.id} className={clsx(styles.tableRow, row.critico && styles.criticalRow)}>
                <td className={styles.tableCell}>{row.dispositivo}</td>
                <td className={styles.tableCell}>{row.tipo}</td>
                <td className={styles.tableCell}>{row.marca}</td>
                <td className={styles.tableCell}>{row.sitio}</td>
                <td className={styles.tableCell}>{row.fco}</td>
                <td className={styles.tableCell} style={{ textAlign: 'center' }}>
                  <span
                    className={clsx(
                      styles.statusIndicator,
                      styles[`status${row.ultimoEstado.replace(/\s+/g, '')}`],
                    )}
                  >
                    {row.ultimoEstado}
                  </span>
                </td>
                <td className={styles.tableCell} style={{ textAlign: 'center' }}>
                  {row.critico && (
                    <FontAwesomeIcon icon={faCircleExclamation} className={styles.criticalIcon} />
                  )}
                </td>
              </tr>
            ))}
          </TableBody>

          {/* Loading indicator moved outside TableBody */}
          {loading && (
            <tfoot>
              <tr className={styles.loadingRow}>
                <td colSpan={7} style={{ textAlign: 'center' }}>
                  <div className={styles.loadingIndicator}></div>
                </td>
              </tr>
            </tfoot>
          )}

          {/* Scroll hint footer also moved outside TableBody */}
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
        </Table>
      </div>
    </div>
  );
};

export default LastStatusTable;
