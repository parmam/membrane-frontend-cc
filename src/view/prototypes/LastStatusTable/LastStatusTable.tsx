import { useCallback, useEffect, useRef, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import Table from '../../elements/Table';
import { TableBody, TableContainer, TableHead } from '../../elements/Table';
import { DEFAULT_TABLE_CONFIG } from '../../elements/Table/config';
import styles from './LastStatusTable.module.css';
import { DeviceData, dummyDeviceData } from './data';

// Extender el tipo Window para permitir el timeout
declare global {
  interface Window {
    scrollTimeout?: number;
    lastScrollTop?: number; // Añadido para tracking de dirección de scroll
    scrollCount?: number; // Contador de eventos de scroll
    debounceTimer?: ReturnType<typeof setTimeout>; // Para debounce
  }
}

interface LastStatusTableProps {
  data?: DeviceData[];
  className?: string;
}

// Función para logging con marca de tiempo
const debugLog = (message: string, data?: Record<string, unknown> | null) => {
  const timestamp = new Date().toISOString().substr(11, 12);
  console.log(`[${timestamp}] 📜 ${message}`, data !== undefined ? data : '');
};

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

const LastStatusTable = ({ data = dummyDeviceData, className }: LastStatusTableProps) => {
  // Cantidad inicial de elementos a mostrar - aumentamos para crear scroll
  const initialVisibleCount = DEFAULT_TABLE_CONFIG.itemsPerPage * 2; // Doubled to ensure scrolling
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    direction: 'none',
  });
  const isLoadingRef = useRef(false); // Referencia para evitar cargas simultáneas

  // Inicializamos contadores de scroll
  if (typeof window !== 'undefined' && window.scrollCount === undefined) {
    window.scrollCount = 0;
    window.lastScrollTop = 0;
  }

  // Log al montar el componente
  useEffect(() => {
    debugLog('⚙️ Tabla inicializada', {
      totalItems: data.length,
      initialVisible: initialVisibleCount,
      config: DEFAULT_TABLE_CONFIG,
    });

    // Log para verificar si el contenedor existe
    if (containerRef.current) {
      debugLog('✅ Contenedor de tabla encontrado', {
        scrollHeight: containerRef.current.scrollHeight,
        clientHeight: containerRef.current.clientHeight,
      });

      // Forzar un recálculo después del montaje
      setTimeout(() => {
        if (containerRef.current) {
          debugLog('🔄 Recalculando dimensiones después del montaje', {
            scrollHeight: containerRef.current.scrollHeight,
            clientHeight: containerRef.current.clientHeight,
            hasOverflow: containerRef.current.scrollHeight > containerRef.current.clientHeight,
          });
          // Forzar una comprobación del scroll
          checkIfNearBottom();
        }
      }, 100);
    } else {
      debugLog('❌ Contenedor de tabla NO encontrado');
    }
  }, [data.length, initialVisibleCount]);

  // Función para cargar más elementos cuando se hace scroll hacia abajo
  const loadMoreItems = useCallback(() => {
    // Prevenir cargas múltiples usando ref en lugar de state
    if (isLoadingRef.current) {
      debugLog('🚫 Carga cancelada: otra carga en progreso');
      return;
    }

    const shouldLoad = displayCount < data.length;
    debugLog(`🔄 Intentando cargar más items. Debería cargar: ${shouldLoad}`, {
      loading: isLoadingRef.current,
      displayCount,
      totalItems: data.length,
    });

    if (!shouldLoad) return;

    // Marcar como cargando
    isLoadingRef.current = true;
    setLoading(true);
    debugLog('⏳ Comenzando carga de más items...');

    // Simulamos una carga asíncrona
    setTimeout(() => {
      setDisplayCount((prevCount) => {
        const newCount = prevCount + initialVisibleCount;
        const finalCount = Math.min(newCount, data.length);
        debugLog(`📊 Incrementando contador de visualización: ${prevCount} -> ${finalCount}`);
        return finalCount;
      });

      // Finalizar carga
      setLoading(false);
      isLoadingRef.current = false;
      debugLog('✅ Carga completada');

      // Forzar un recálculo después de cargar más elementos
      setTimeout(() => {
        if (containerRef.current) {
          debugLog('🔄 Recalculando dimensiones después de carga', {
            scrollHeight: containerRef.current.scrollHeight,
            clientHeight: containerRef.current.clientHeight,
            hasOverflow: containerRef.current.scrollHeight > containerRef.current.clientHeight,
          });
        }
      }, 50);
    }, 300);
  }, [data.length, displayCount, initialVisibleCount]);

  // Verificar si estamos cerca del final del scroll
  const checkIfNearBottom = useCallback(() => {
    if (!containerRef.current) {
      debugLog('❌ checkIfNearBottom: contenedor no existe');
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Determinar dirección de scroll
    const lastScrollTop = window.lastScrollTop ?? 0; // Usar nullish coalescing para evitar el error
    const direction =
      scrollTop > lastScrollTop ? 'down' : scrollTop < lastScrollTop ? 'up' : 'none';

    // Actualizar último scrollTop
    window.lastScrollTop = scrollTop;

    // Incrementar contador de scroll
    if (window.scrollCount !== undefined) {
      window.scrollCount++;
    }

    // Usar el valor configurado para el umbral de scroll
    const threshold = DEFAULT_TABLE_CONFIG.scrollThreshold;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

    // Si estamos a menos del umbral del final, consideramos que estamos cerca del final
    const nearBottom = distanceFromBottom < threshold;

    // Actualizar info de scroll para depuración
    setScrollInfo({
      scrollTop,
      scrollHeight,
      clientHeight,
      direction,
    });

    debugLog('🔍 Comprobando posición de scroll', {
      scrollTop,
      scrollHeight,
      clientHeight,
      distanceFromBottom,
      threshold,
      nearBottom,
      direction,
      scrollPercentage: scrollPercentage.toFixed(2) + '%',
      scrollEvents: window.scrollCount,
      bottomDistance: distanceFromBottom,
      viewportHeight: clientHeight,
    });

    // Solo actualizamos el estado si cambia para evitar renderizados innecesarios
    if (nearBottom !== isNearBottom) {
      setIsNearBottom(nearBottom);
      debugLog(
        `${nearBottom ? '⬇️' : '⬆️'} Cambio en isNearBottom: ${isNearBottom} -> ${nearBottom}`,
      );

      // Si estamos cerca del final y hay más elementos por cargar, los cargamos
      // Pero solo si el usuario está desplazándose hacia abajo
      if (
        nearBottom &&
        direction === 'down' &&
        !isLoadingRef.current &&
        displayCount < data.length
      ) {
        debugLog('📍 Detectado scroll cerca del final, cargando más elementos');
        loadMoreItems();
      }
    }
  }, [data.length, displayCount, isNearBottom, loadMoreItems]);

  // Versión con debounce del checkIfNearBottom
  const debouncedCheckIfNearBottom = useCallback(
    debounce(() => {
      checkIfNearBottom();
    }, 150), // 150ms de debounce para evitar múltiples llamadas
    [checkIfNearBottom],
  );

  // Manejar eventos de scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      debugLog('❌ No se pudo agregar listener de scroll: contenedor no existe');
      return;
    }

    // Implementación directa del evento de scroll
    const handleScroll = (e: Event) => {
      debugLog('🖱️ Evento de scroll detectado', {
        eventType: e.type,
        source: 'eventListener',
        timestamp: new Date().getTime(),
      });

      // Usamos el método con debounce
      debouncedCheckIfNearBottom();
    };

    // Registrar el evento de scroll directamente
    debugLog('🔄 Registrando evento de scroll');
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Verificar si hay overflow para que el scroll funcione
    const hasOverflow = container.scrollHeight > container.clientHeight;
    debugLog('📏 Estado de overflow del contenedor', {
      hasOverflow,
      scrollHeight: container.scrollHeight,
      clientHeight: container.clientHeight,
      difference: container.scrollHeight - container.clientHeight,
    });

    // Limpieza
    return () => {
      debugLog('🧹 Eliminando evento de scroll');
      container.removeEventListener('scroll', handleScroll);

      // Limpiar el debounce timer si existe
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [debouncedCheckIfNearBottom]);

  // Efecto para loggear cambios en displayCount
  useEffect(() => {
    debugLog(`📊 Valor de displayCount actualizado: ${displayCount}/${data.length}`);
  }, [displayCount, data.length]);

  // Forzar una comprobación cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = debounce(() => {
      debugLog('📏 Resize detectado, comprobando posición');

      if (containerRef.current) {
        debugLog('📐 Dimensiones después de resize', {
          scrollHeight: containerRef.current.scrollHeight,
          clientHeight: containerRef.current.clientHeight,
          hasOverflow: containerRef.current.scrollHeight > containerRef.current.clientHeight,
        });
      }

      checkIfNearBottom();
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [checkIfNearBottom]);

  // Elementos que serán mostrados según el scroll
  const visibleData = data.slice(0, displayCount);
  const hasMore = displayCount < data.length;

  // Log cada renderizado
  debugLog('🔄 Renderizando tabla', {
    visibleItems: visibleData.length,
    totalItems: data.length,
    displayCount,
    hasMore,
    loading,
    isNearBottom,
    scrollInfo,
  });

  return (
    <div className={clsx(styles.lastStatusTableWrapper, className)} style={{ overflow: 'hidden' }}>
      <TableContainer
        ref={containerRef}
        className={styles.tableContainer}
        style={{
          height: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
          maxHeight: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
          overflowY: 'auto',
          overflowX: 'hidden', // Hide horizontal scrollbar
        }}
        onScroll={(e) => {
          debugLog('📜 Evento onScroll directo del contenedor', {
            source: 'onScroll prop',
            target: e.currentTarget.className,
            timestamp: new Date().getTime(),
          });
          debouncedCheckIfNearBottom();
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
            {loading && (
              <tr className={styles.loadingRow}>
                <td colSpan={7} className={styles.loadingCell}>
                  <div className={styles.loadingIndicator}>Cargando más dispositivos...</div>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
        {hasMore && !loading && (
          <div className={styles.scrollHint}>
            Desplázate hacia abajo para cargar más ({visibleData.length} de {data.length})
          </div>
        )}
      </TableContainer>

      {/* Indicador de depuración para la posición de scroll - visible solo en desarrollo */}
      {process.env.NODE_ENV !== 'production' && (
        <div
          className={styles.debugInfo}
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999,
            maxWidth: '300px',
            overflow: 'auto',
          }}
        >
          <div>
            <strong>Scroll Debug:</strong>
          </div>
          <div>Top: {scrollInfo.scrollTop}px</div>
          <div>Height: {scrollInfo.scrollHeight}px</div>
          <div>Viewport: {scrollInfo.clientHeight}px</div>
          <div>Direction: {scrollInfo.direction}</div>
          <div>Is Near Bottom: {isNearBottom ? 'YES' : 'NO'}</div>
          <div>
            Items: {displayCount}/{data.length}
          </div>
          <div>Loading: {loading ? 'YES' : 'NO'}</div>
          <div>Loading Ref: {isLoadingRef.current ? 'YES' : 'NO'}</div>
          <div>
            Scroll %:{' '}
            {scrollInfo.scrollHeight
              ? (
                  (scrollInfo.scrollTop / (scrollInfo.scrollHeight - scrollInfo.clientHeight)) *
                  100
                ).toFixed(1) + '%'
              : 'N/A'}
          </div>
          <div>Events: {window.scrollCount || 0}</div>
        </div>
      )}
    </div>
  );
};

export default LastStatusTable;
