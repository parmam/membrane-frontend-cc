import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DateSelector from '@view/components/DateSelector/DateSelector';
import Option from '@view/elements/Option/Option';
import Select from '@view/elements/Select/Select';

import { Device, DeviceStatus, Place } from '../../../../store/types/ApiTypes';
import styles from './MonitoringFilters.module.css';

interface MonitoringFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  devices?: Device[];
  deviceStatus?: DeviceStatus[];
  places?: Place[];
  isLoading?: boolean;
}

interface FilterState {
  device: string;
  location: string;
  status: string;
  critical: string;
  floorPlan: string;
  startDate: string | null;
  endDate: string | null;
}

const MonitoringFilters: FunctionComponent<MonitoringFiltersProps> = (props) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    device: '',
    location: '',
    status: '',
    critical: '',
    floorPlan: '',
    startDate: null,
    endDate: null,
  });

  const { devices = [], deviceStatus = [], places = [], isLoading = false } = props;

  const handleFilterChange = <K extends keyof FilterState>(field: K, value: FilterState[K]) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };

    setFilters(newFilters);

    if (props.onFilterChange) {
      props.onFilterChange(newFilters);
    }
  };

  const handleDateChange = (startDate: string | null, endDate: string | null) => {
    const newFilters = {
      ...filters,
      startDate,
      endDate,
    };

    setFilters(newFilters);

    if (props.onFilterChange) {
      props.onFilterChange(newFilters);
    }
  };

  const resetFilters = () => {
    const resetValues: FilterState = {
      device: '',
      location: '',
      status: '',
      critical: '',
      floorPlan: '',
      startDate: null,
      endDate: null,
    };

    setFilters(resetValues);

    if (props.onFilterChange) {
      props.onFilterChange(resetValues);
    }
  };

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  // Count active filters for display
  const getActiveFilterCount = () => {
    return Object.values(filters).filter((value) => value !== '' && value !== null).length;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.filtersHeader}>
        <div className={styles.filtersTitleContainer}>
          <h3 className={styles.filtersTitle}>{t('common.filters')}</h3>
          {activeFilterCount > 0 && (
            <span className={styles.activeFilterBadge}>{activeFilterCount}</span>
          )}
        </div>
        <div className={styles.filtersHeaderActions}>
          <button className={styles.resetButton} onClick={resetFilters} type='button'>
            {t('common.resetFilters')}
          </button>
          <button
            className={styles.toggleButton}
            onClick={toggleFilters}
            type='button'
            aria-expanded={isExpanded}
            aria-label={isExpanded ? t('common.collapse') : t('common.expand')}
          >
            <span className={`${styles.toggleIcon} ${isExpanded ? styles.expanded : ''}`}>▼</span>
          </button>
        </div>
      </div>

      <div
        className={`${styles.filtersContainer} ${isExpanded ? styles.expanded : styles.collapsed}`}
      >
        {/* First row of filters */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <Select
              label={t('common.device')}
              value={filters.device}
              onChange={(value: string) => handleFilterChange('device', value)}
              disabled={isLoading}
            >
              <Option value=''>{t('monitoring.allDevices')}</Option>
              {devices.map((device: Device) => (
                <Option key={device.id} value={device.id}>
                  {device.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('monitoring.location')}
              value={filters.location}
              onChange={(value: string) => handleFilterChange('location', value)}
              disabled={isLoading}
            >
              <Option value=''>{t('monitoring.allLocations')}</Option>
              {places.map((place: Place) => (
                <Option key={place.id} value={place.id}>
                  {place.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.status')}
              value={filters.status}
              onChange={(value: string) => handleFilterChange('status', value)}
              disabled={isLoading}
            >
              <Option value=''>{t('monitoring.allStatuses')}</Option>
              {deviceStatus.map((status: DeviceStatus) => (
                <Option key={status.id} value={status.id}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.critical')}
              value={filters.critical}
              onChange={(value: string) => handleFilterChange('critical', value)}
              disabled={isLoading}
            >
              <Option value=''>{t('common.all')}</Option>
              <Option value='true'>{t('common.yes')}</Option>
              <Option value='false'>{t('common.no')}</Option>
            </Select>
          </div>
        </div>

        {/* Second row of filters */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <Select
              label={t('monitoring.floorPlan')}
              value={filters.floorPlan}
              onChange={(value: string) => handleFilterChange('floorPlan', value)}
              disabled={isLoading}
            >
              <Option value=''>{t('monitoring.allFloorPlans')}</Option>
              {places.map((place: Place) => (
                <Option key={`floor-${place.id}`} value={place.id}>
                  {place.name} Floor Plan
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <DateSelector
              label={t('monitoring.dateRange')}
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDateChange={handleDateChange}
            />
          </div>

          {isLoading && (
            <div className={styles.filterGroup}>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <span>Loading filters...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitoringFilters;
