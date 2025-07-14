import { MonitoringData, convertDeviceMonitoringToMonitoringData } from '@/models/MonitoringData';
import { AppDispatch, RootState } from '@/store';
import {
  getDeviceMonitoringThunk,
  getMonitoringPageInitialDataThunk,
} from '@/store/actions/deviceMonitoringActions';
import MonitoringFilters from '@/view/prototypes/Monitoring/MonitoringFilters/MonitoringFilters';
import MonitoringTable from '@/view/prototypes/Monitoring/MonitoringTable/MonitoringTable';

import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const deviceMonitoring = useSelector((state: RootState) => state.deviceMonitoring);
  const devices = useSelector((state: RootState) => state.devices);
  const deviceStatus = useSelector((state: RootState) => state.deviceStatus);
  const places = useSelector((state: RootState) => state.places);

  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    device: '',
    location: '',
    status: '',
    critical: '',
    floorPlan: '',
    startDate: null,
    endDate: null,
  });

  // Load initial data
  useEffect(() => {
    dispatch(getMonitoringPageInitialDataThunk());
  }, [dispatch]);

  // Convert monitoring data to display format with proper validation
  const monitoringData: MonitoringData[] = useMemo(() => {
    if (!deviceMonitoring.monitoringData || !Array.isArray(deviceMonitoring.monitoringData)) {
      return [];
    }

    try {
      const convertedData = deviceMonitoring.monitoringData.map(
        convertDeviceMonitoringToMonitoringData,
      );
      return convertedData;
    } catch (error) {
      console.error('❌ Error converting device monitoring data:', error);
      return [];
    }
  }, [deviceMonitoring.monitoringData]);

  const handleFilterChange = async (filters: FilterState) => {
    setCurrentFilters(filters);

    // Build query parameters for the API
    const queryParams: Partial<{
      limit: number;
      offset: number;
      withTrashed: 0 | 1;
      device: string;
      place: string;
      deviceStatus: string;
      isCritical: boolean;
      startDate: string;
      endDate: string;
    }> = {
      limit: 10,
      offset: 0,
      withTrashed: 1,
    };

    // Map frontend filters to API parameters
    if (filters.device) {
      queryParams.device = filters.device;
    }
    if (filters.location) {
      queryParams.place = filters.location;
    }
    if (filters.status) {
      queryParams.deviceStatus = filters.status;
    }
    if (filters.critical === 'true') {
      queryParams.isCritical = true;
    } else if (filters.critical === 'false') {
      queryParams.isCritical = false;
    }
    if (filters.startDate) {
      queryParams.startDate = filters.startDate;
    }
    if (filters.endDate) {
      queryParams.endDate = filters.endDate;
    }

    try {
      await dispatch(getDeviceMonitoringThunk(queryParams));
    } catch (error) {
      console.error('Error filtering monitoring data:', error);
    }
  };

  const isLoading = deviceMonitoring.loading.getMonitoringPageInitialDataThunk;
  const error = deviceMonitoring.error;

  if (error) {
    return (
      <div style={{ width: '100%', padding: '2rem', textAlign: 'center' }}>
        <h2>Error loading data</h2>
        <p>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.pageHeader}>
        <ContentTitles
          title={t('pages.monitoring.title')}
          subtitle={t('pages.monitoring.subtitle')}
        />
        <MonitoringFilters
          onFilterChange={handleFilterChange}
          devices={devices.devices}
          deviceStatus={deviceStatus.deviceStatuses}
          places={places.places}
          isLoading={isLoading}
        />

        <div className={styles.resultsInfo}>
          <span className={styles.resultCount}>
            {t('common.showing', {
              count: monitoringData.length,
              total: deviceMonitoring.total,
            })}
          </span>
        </div>
      </div>

      <section className={styles.pageContent}>
        {isLoading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Loading monitoring data...</p>
          </div>
        ) : (
          <MonitoringTable data={monitoringData} />
        )}
      </section>
    </div>
  );
};

export default MonitoringPage;
