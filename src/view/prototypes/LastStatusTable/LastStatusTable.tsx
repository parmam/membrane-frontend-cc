import { useEffect, useMemo, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowSize from '@hooks/useWindowSize';
import { VirtualizedTable } from '@view/elements/Table';
import { VirtualizedListConfig } from '@view/elements/Table/config';
import LastStatusCards from '@view/prototypes/LastStatusMobileView/LastStatusCards';
import clsx from 'clsx';

import styles from './LastStatusTable.module.css';
import { DeviceData, dummyDeviceData } from './data';

// Media query para detección de móviles
const MOBILE_BREAKPOINT = 768;

interface LastStatusTableProps {
  data?: DeviceData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
}

// Configuración optimizada por defecto
const DEFAULT_TABLE_CONFIG: Partial<VirtualizedListConfig> = {
  useRemainingItemsThreshold: false,
  remainingItemsThreshold: 5,
  containerHeight: 600,
  itemsPerPage: 10, // Cargar menos elementos por vez
  loadThresholdPercent: 60, // Bajamos significativamente el umbral de porcentaje
  prefetchThresholdPercent: 50, // Prefetch más temprano
  pixelBasedThreshold: true, // Activamos explícitamente el umbral basado en píxeles
  pixelBasedLoadThreshold: 300, // Cargar cuando queden 300px para el final
  pixelBasedPrefetchThreshold: 600, // Prefetch cuando queden 600px para el final
};

const LastStatusTable = ({
  data = dummyDeviceData,
  className,
  config = {},
}: LastStatusTableProps) => {
  const { isMobile } = useWindowSize(MOBILE_BREAKPOINT);

  // Crear configuración una sola vez para evitar re-renderizados innecesarios
  const mergedConfig = useMemo(() => {
    const merged = { ...DEFAULT_TABLE_CONFIG, ...config };
    return merged;
  }, [config]);

  // Función para renderizar la cabecera de la tabla
  const renderHead = () => (
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
  );

  // Función para renderizar cada fila de la tabla
  const renderRow = (row: DeviceData, index: number) => (
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
  );

  // Función para renderizar el footer personalizado
  const renderFooter = (visibleData: DeviceData[], allData: DeviceData[], loading: boolean) => (
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

      {visibleData.length < allData.length && !loading && (
        <tfoot>
          <tr>
            <td colSpan={7}>
              <div className={styles.scrollHint}>
                Desplázate hacia abajo para cargar más ({visibleData.length} de {allData.length})
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );

  // Si es vista móvil, renderizamos el componente LastStatusCards
  if (isMobile) {
    return <LastStatusCards data={data} className={className} config={mergedConfig} />;
  }

  // Vista de escritorio con tabla virtualizada
  return (
    <div
      className={styles.lastStatusTableWrapper}
      style={{ height: `${mergedConfig.containerHeight}px` }}
    >
      <VirtualizedTable
        data={data}
        className={styles.lastStatusTableWrapper}
        containerClassName={styles.tableContainer}
        config={mergedConfig}
        renderHead={renderHead}
        renderRow={renderRow}
        renderFooter={renderFooter}
      />
    </div>
  );
};

export default LastStatusTable;
