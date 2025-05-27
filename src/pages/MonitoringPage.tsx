import MonitoringFilters from '@/view/prototypes/Monitoring/MonitoringFilters/MonitoringFilters';
import MonitoringTable from '@/view/prototypes/Monitoring/MonitoringTable/MonitoringTable';
import {
  MonitoringData,
  dummyMonitoringData,
} from '@/view/prototypes/Monitoring/MonitoringTable/data';

import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

import styles from './MonitoringPage.module.css';

interface FilterState {
  device: string;
  location: string;
  status: string;
  critical: string;
  floorPlan: string;
  startDate: string | null;
  endDate: string | null;
}

const MonitoringPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = useState<MonitoringData[]>(dummyMonitoringData);
  const [totalDevices] = useState<number>(dummyMonitoringData.length);

  const handleFilterChange = (filters: FilterState) => {
    // Filter data based on selected filters
    const filtered = dummyMonitoringData.filter((device) => {
      // Device filter
      if (filters.device && !device.dispositivo.includes(filters.device)) {
        return false;
      }

      // Location filter
      if (filters.location && device.ubicacion !== filters.location) {
        return false;
      }

      // Status filter
      if (filters.status && device.estado !== filters.status) {
        return false;
      }

      // Critical filter
      if (filters.critical === 'true' && !device.critico) {
        return false;
      } else if (filters.critical === 'false' && device.critico) {
        return false;
      }

      // Floor plan filter
      if (filters.floorPlan && device.plano !== filters.floorPlan) {
        return false;
      }

      // Date filter
      if (filters.startDate || filters.endDate) {
        const deviceDate = new Date(device.timestamp);

        if (filters.startDate) {
          const startDate = new Date(filters.startDate);
          if (deviceDate < startDate) {
            return false;
          }
        }

        if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          // Adjust end of day to include the entire selected day
          endDate.setHours(23, 59, 59, 999);
          if (deviceDate > endDate) {
            return false;
          }
        }
      }

      return true;
    });

    setFilteredData(filtered);
  };

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.pageHeader}>
        <ContentTitles
          title={t('pages.monitoring.title')}
          subtitle={t('pages.monitoring.subtitle')}
        />
        <MonitoringFilters onFilterChange={handleFilterChange} />

        <div className={styles.resultsInfo}>
          <span className={styles.resultCount}>
            {t('common.showing', { count: filteredData.length, total: totalDevices })}
          </span>
        </div>
      </div>

      <section className={styles.pageContent}>
        <MonitoringTable data={filteredData} />
      </section>
    </div>
  );
};

export default MonitoringPage;
