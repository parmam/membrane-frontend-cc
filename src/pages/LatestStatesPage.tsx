import LatestStatesFilters from '@/view/prototypes/LastStatus/LastStatusFilters/LatestStatesFilters';
import LastStatusTable from '@/view/prototypes/LastStatus/LastStatusTable/LastStatusTable';
import { DeviceData, dummyDeviceData } from '@/view/prototypes/LastStatus/LastStatusTable/data';

import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

import styles from './LatestStatesPage.module.css';

interface FilterState {
  device: string;
  type: string;
  brand: string;
  site: string;
  lastStatus: string;
  critical: string;
  startDate: string | null;
  endDate: string | null;
}

const LatestStatesPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = useState<DeviceData[]>(dummyDeviceData);
  const [totalDevices] = useState<number>(dummyDeviceData.length);

  const handleFilterChange = (filters: FilterState) => {
    // Filter data based on selected filters
    const filtered = dummyDeviceData.filter((device) => {
      // Device filter
      if (filters.device && !device.dispositivo.includes(filters.device)) {
        return false;
      }

      // Type filter
      if (filters.type && device.tipo !== filters.type) {
        return false;
      }

      // Brand filter
      if (filters.brand && device.marca !== filters.brand) {
        return false;
      }

      // Site filter
      if (filters.site && device.sitio !== filters.site) {
        return false;
      }

      // Status filter
      if (filters.lastStatus && device.ultimoEstado !== filters.lastStatus) {
        return false;
      }

      // Critical filter
      if (filters.critical === 'true' && !device.critico) {
        return false;
      } else if (filters.critical === 'false' && device.critico) {
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
        <ContentTitles title={t('latestStates.title')} subtitle={t('latestStates.subtitle')} />
        <LatestStatesFilters onFilterChange={handleFilterChange} />

        <div className={styles.resultsInfo}>
          <span className={styles.resultCount}>
            {t('common.showing', { count: filteredData.length, total: totalDevices })}
          </span>
        </div>
      </div>

      <section className={styles.pageContent}>
        <LastStatusTable data={filteredData} />
      </section>
    </div>
  );
};

export default LatestStatesPage;
