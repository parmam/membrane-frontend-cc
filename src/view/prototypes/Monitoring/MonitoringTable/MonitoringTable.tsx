import {
  MonitoringData,
  dummyMonitoringData,
} from '@/view/prototypes/Monitoring/MonitoringTable/data';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { faCircleExclamation, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowSize from '@hooks/useWindowSize';
import { VirtualizedTable } from '@view/elements/Table';
import { VirtualizedListConfig } from '@view/elements/Table/config';
import clsx from 'clsx';

import MonitoringCards from '../MonitoringMobileView/MonitoringCards';
import styles from './MonitoringTable.module.css';

// Media query for mobile detection
const MOBILE_BREAKPOINT = 768;

interface MonitoringTableProps {
  data?: MonitoringData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
}

// Default optimized configuration
const DEFAULT_TABLE_CONFIG: Partial<VirtualizedListConfig> = {
  useRemainingItemsThreshold: false,
  remainingItemsThreshold: 5,
  containerHeight: 600,
  itemsPerPage: 10,
  loadThresholdPercent: 60,
  prefetchThresholdPercent: 50,
  pixelBasedThreshold: true,
  pixelBasedLoadThreshold: 300,
  pixelBasedPrefetchThreshold: 600,
};

const MonitoringTable = ({
  data = dummyMonitoringData,
  className,
  config = {},
}: MonitoringTableProps) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize(MOBILE_BREAKPOINT);

  // Create configuration once to avoid unnecessary re-renders
  const mergedConfig = useMemo(() => {
    return { ...DEFAULT_TABLE_CONFIG, ...config };
  }, [config]);

  // Function to render table header
  const renderHead = () => (
    <tr>
      <th className={styles.tableHeadCell} style={{ width: '15%' }}>
        {t('monitoring.fecha')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '15%' }}>
        {t('monitoring.dispositivo')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '8%', textAlign: 'center' }}>
        {t('monitoring.critico')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '15%' }}>
        {t('monitoring.ubicacion')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '12%' }}>
        {t('monitoring.estado')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '10%', textAlign: 'center' }}>
        {t('monitoring.verImagen')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '10%' }}>
        {t('monitoring.plano')}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '15%' }}>
        {t('monitoring.uptime')}
      </th>
    </tr>
  );

  // Function to render each table row
  const renderRow = (row: MonitoringData, index: number) => (
    <tr key={row.id} className={clsx(styles.tableRow, row.critico && styles.criticalRow)}>
      <td className={styles.tableCell}>{row.fecha}</td>
      <td className={styles.tableCell}>{row.dispositivo}</td>
      <td className={styles.tableCell} style={{ textAlign: 'center' }}>
        {row.critico && (
          <FontAwesomeIcon icon={faCircleExclamation} className={styles.criticalIcon} />
        )}
      </td>
      <td className={styles.tableCell}>{row.ubicacion}</td>
      <td className={styles.tableCell} style={{ textAlign: 'center' }}>
        <span
          className={clsx(
            styles.statusIndicator,
            styles[`status${row.estado.replace(/\s+/g, '')}`],
          )}
        >
          {row.estado}
        </span>
      </td>
      <td className={styles.tableCell} style={{ textAlign: 'center' }}>
        <a
          href={row.imagen}
          className={styles.viewImageLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon icon={faImage} />
        </a>
      </td>
      <td className={styles.tableCell}>{row.plano}</td>
      <td className={styles.tableCell}>{row.uptime}</td>
    </tr>
  );

  // Function to render custom footer
  const renderFooter = (
    visibleData: MonitoringData[],
    allData: MonitoringData[],
    loading: boolean,
  ) => (
    <>
      {loading && (
        <tfoot>
          <tr className={styles.loadingRow}>
            <td colSpan={8} style={{ textAlign: 'center' }}>
              <div className={styles.loadingIndicator}></div>
            </td>
          </tr>
        </tfoot>
      )}

      {visibleData.length < allData.length && !loading && (
        <tfoot>
          <tr>
            <td colSpan={8}>
              <div className={styles.scrollHint}>
                {t('common.scrollForMore', {
                  visible: visibleData.length,
                  total: allData.length,
                })}
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );

  // If mobile view, render the cards component
  if (isMobile) {
    return <MonitoringCards data={data} className={className} config={mergedConfig} />;
  }

  // Desktop view with virtualized table
  return (
    <div
      className={styles.monitoringTableWrapper}
      style={{ height: `${mergedConfig.containerHeight}px` }}
    >
      <VirtualizedTable
        data={data}
        className={styles.monitoringTableWrapper}
        containerClassName={styles.tableContainer}
        config={mergedConfig}
        renderHead={renderHead}
        renderRow={renderRow}
        renderFooter={renderFooter}
      />
    </div>
  );
};

export default MonitoringTable;
