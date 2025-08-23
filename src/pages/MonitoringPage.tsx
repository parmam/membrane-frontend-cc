import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getDeviceMonitoringThunk } from '@/store/actions/deviceMonitoringActions';
import { DeviceMonitoringStatus } from '@/store/types/DeviceMonitoringTypes';

import { useEffect, useState } from 'react';

import { ContentTitles } from '@view/components/ContentTitles';
import { MonitoringFilters } from '@view/prototypes/Monitoring/MonitoringFilters';
import { MonitoringTable } from '@view/prototypes/Monitoring/MonitoringTable';

import styles from './MonitoringPage.module.css';

const MonitoringPage = () => {
  const dispatch = useAppDispatch();
  const { monitoringData, total, status, error } = useAppSelector(
    (state) => state.deviceMonitoring,
  );
  const [filters, setFilters] = useState({});

  useEffect(() => {
    dispatch(getDeviceMonitoringThunk(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const isLoading = status === DeviceMonitoringStatus.Fetching;

  return (
    <div className={styles.container}>
      <ContentTitles title='Monitoring' subtitle='Real-time device monitoring' />
      <MonitoringFilters onFilterChange={handleFilterChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && <MonitoringTable data={monitoringData} totalRecords={total} />}
    </div>
  );
};

export default MonitoringPage;
