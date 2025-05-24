import { useCallback, useEffect, useRef, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@view/elements/Table';
import { TableBody, TableHead } from '@view/elements/Table';
import { DEFAULT_TABLE_CONFIG } from '@view/elements/Table/config';
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

const LastStatusTable = ({ data = dummyDeviceData, className }: LastStatusTableProps) => {
  // Cantidad inicial de elementos a mostrar - aumentamos para crear scroll
  const initialVisibleCount = DEFAULT_TABLE_CONFIG.itemsPerPage * 2; // Doubled to ensure scrolling
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const isLoadingRef = useRef(false); // Referencia para evitar cargas simultáneas
  const [isMobileView, setIsMobileView] = useState(isMobileViewport());

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
  const loadMoreItems = useCallback(() => {
    // Prevenir cargas múltiples usando ref en lugar de state
    if (isLoadingRef.current) {
      return;
    }

    const shouldLoad = displayCount < data.length;
    if (!shouldLoad) return;

    // Marcar como cargando
    isLoadingRef.current = true;
    setLoading(true);

    // Simulamos una carga asíncrona
    setTimeout(() => {
      setDisplayCount((prevCount) => {
        const newCount = prevCount + initialVisibleCount;
        return Math.min(newCount, data.length);
      });

      // Finalizar carga
      setLoading(false);
      isLoadingRef.current = false;
    }, 300);
  }, [data.length, displayCount, initialVisibleCount]);

  // Verificar si estamos cerca del final del scroll
  const checkIfNearBottom = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Determinar dirección de scroll
    const lastScrollTop = window.lastScrollTop ?? 0;
    const direction =
      scrollTop > lastScrollTop ? 'down' : scrollTop < lastScrollTop ? 'up' : 'none';

    // Actualizar último scrollTop
    window.lastScrollTop = scrollTop;

    // Usar el valor configurado para el umbral de scroll
    const threshold = DEFAULT_TABLE_CONFIG.scrollThreshold;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Si estamos a menos del umbral del final, consideramos que estamos cerca del final
    const nearBottom = distanceFromBottom < threshold;

    // Solo actualizamos el estado si cambia para evitar renderizados innecesarios
    if (nearBottom !== isNearBottom) {
      setIsNearBottom(nearBottom);

      // Si estamos cerca del final y hay más elementos por cargar, los cargamos
      // Pero solo si el usuario está desplazándose hacia abajo
      if (
        nearBottom &&
        direction === 'down' &&
        !isLoadingRef.current &&
        displayCount < data.length
      ) {
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
    // Skip for mobile view
    if (isMobileView) return;

    const container = containerRef.current;
    if (!container) return;

    // Implementación directa del evento de scroll
    const handleScroll = () => {
      // Usamos el método con debounce
      debouncedCheckIfNearBottom();
    };

    // Registrar el evento de scroll directamente
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Debug log
    console.log('Scroll event registered on table container');

    // Limpieza
    return () => {
      container.removeEventListener('scroll', handleScroll);

      // Limpiar el debounce timer si existe
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [debouncedCheckIfNearBottom, isMobileView]);

  // Forzar una comprobación cuando cambia el tamaño de la ventana
  useEffect(() => {
    // Skip for mobile view
    if (isMobileView) return;

    const handleResize = debounce(() => {
      checkIfNearBottom();
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [checkIfNearBottom, isMobileView]);

  // Elementos que serán mostrados según el scroll
  const visibleData = data.slice(0, displayCount);
  const hasMore = displayCount < data.length;

  // Si es vista móvil, renderizamos el componente LastStatusCards
  if (isMobileView) {
    return <LastStatusCards data={data} className={className} />;
  }

  // Vista de escritorio con tabla
  return (
    <div className={clsx(styles.lastStatusTableWrapper, className)} style={{ overflow: 'hidden' }}>
      <div
        ref={containerRef}
        className={styles.tableContainer}
        style={{
          height: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
          maxHeight: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
          overflowY: 'auto',
          overflowX: 'hidden', // Hide horizontal scrollbar
        }}
        onScroll={(e) => {
          // Direct scroll handler
          if (!isMobileView) {
            debouncedCheckIfNearBottom();
          }
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
