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
  }
}

interface LastStatusTableProps {
  data?: DeviceData[];
  className?: string;
}

const LastStatusTable = ({ data = dummyDeviceData, className }: LastStatusTableProps) => {
  const [visibleData, setVisibleData] = useState<DeviceData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [loadedItems, setLoadedItems] = useState(DEFAULT_TABLE_CONFIG.itemsPerPage * 2);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Calcular qué filas renderizar basado en la posición del scroll
  const calculateVisibleRows = useCallback(() => {
    if (!containerRef.current) return;

    const { rowHeight, bufferSize } = DEFAULT_TABLE_CONFIG;
    const containerHeight = containerRef.current.clientHeight;
    const scrollPosition = containerRef.current.scrollTop;
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const totalVisibleCount = visibleCount + bufferSize * 2;

    // Calcular índice inicial basado en la posición del scroll
    const startIndex = Math.max(0, Math.floor(scrollPosition / rowHeight) - bufferSize);

    // Si estamos cerca del final de los datos cargados, cargar más
    if (startIndex + totalVisibleCount > loadedItems && loadedItems < data.length) {
      setLoadedItems(Math.min(data.length, loadedItems + DEFAULT_TABLE_CONFIG.itemsPerPage));
    }

    // Cortar el array de datos para renderizar solo las filas visibles
    const endIndex = Math.min(loadedItems, startIndex + totalVisibleCount);

    // Actualizar datos visibles
    setVisibleData(data.slice(0, endIndex));
  }, [data, loadedItems]);

  // Manejar eventos de scroll
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);

    if (!isScrolling) {
      setIsScrolling(true);
    }

    // Debounce para calcular las filas visibles
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      calculateVisibleRows();
      setIsScrolling(false);
    }, 100);
  }, [calculateVisibleRows, isScrolling]);

  // Calcular filas visibles cuando cambian las dependencias
  useEffect(() => {
    calculateVisibleRows();
  }, [calculateVisibleRows]);

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Agregar event listener para el scroll
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className={clsx(styles.lastStatusTableWrapper, className)}>
      <TableContainer
        ref={containerRef}
        className={styles.tableContainer}
        style={{
          height: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
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
            {isScrolling && visibleData.length < data.length && (
              <tr className={styles.loadingRow}>
                <td colSpan={7} className={styles.loadingCell}>
                  <div className={styles.loadingIndicator}>Cargando más dispositivos...</div>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LastStatusTable;
