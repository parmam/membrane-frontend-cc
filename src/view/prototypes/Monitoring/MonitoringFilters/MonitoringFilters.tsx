import {
  deviceTypes,
  floorPlans,
  locations,
  statusOptions,
} from '@/view/prototypes/Monitoring/MonitoringTable/data';

import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DateSelector from '@view/components/DateSelector/DateSelector';
import Option from '@view/elements/Option/Option';
import Select from '@view/elements/Select/Select';

import styles from './MonitoringFilters.module.css';

interface MonitoringFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
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
            >
              <Option value=''>{t('monitoring.allDevices')}</Option>
              {/* In a real case, this could be a dynamic list of devices */}
              <Option value='Device-1000'>Device-1000</Option>
              <Option value='Device-1001'>Device-1001</Option>
              <Option value='Device-1002'>Device-1002</Option>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('monitoring.location')}
              value={filters.location}
              onChange={(value: string) => handleFilterChange('location', value)}
            >
              <Option value=''>{t('monitoring.allLocations')}</Option>
              {locations.map((location: string) => (
                <Option key={location} value={location}>
                  {location}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.status')}
              value={filters.status}
              onChange={(value: string) => handleFilterChange('status', value)}
            >
              <Option value=''>{t('monitoring.allStatuses')}</Option>
              {statusOptions.map((status: string) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.critical')}
              value={filters.critical}
              onChange={(value: string) => handleFilterChange('critical', value)}
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
            >
              <Option value=''>{t('monitoring.allFloorPlans')}</Option>
              {floorPlans.map((plan: string) => (
                <Option key={plan} value={plan}>
                  {plan}
                </Option>
              ))}
            </Select>
          </div>

          <div
            className={`${styles.filterGroup} ${styles.dateFilterGroup}`}
            style={{ zIndex: 999 }}
          >
            <DateSelector
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDateChange={handleDateChange}
              label={t('dateSelector.dateRange')}
            />
          </div>

          {/* Empty spaces to balance distribution */}
          <div className={styles.filterGroup}></div>
          <div className={styles.filterGroup}></div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringFilters;
