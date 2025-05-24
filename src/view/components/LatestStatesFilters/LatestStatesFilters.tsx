import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Option from '../../elements/Option/Option';
import Select from '../../elements/Select/Select';
import { brands, deviceTypes, sites, statusOptions } from '../../prototypes/LastStatusTable/data';
import DateSelector from '../DateSelector/DateSelector';
import styles from './LatestStatesFilters.module.css';

interface LatestStatesFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

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

const LatestStatesFilters: FunctionComponent<LatestStatesFiltersProps> = (props) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    device: '',
    type: '',
    brand: '',
    site: '',
    lastStatus: '',
    critical: '',
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
      type: '',
      brand: '',
      site: '',
      lastStatus: '',
      critical: '',
      startDate: null,
      endDate: null,
    };

    setFilters(resetValues);

    if (props.onFilterChange) {
      props.onFilterChange(resetValues);
    }
  };

  return (
    <div>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>{t('common.filters')}</h3>
        <button className={styles.resetButton} onClick={resetFilters} type='button'>
          {t('common.resetFilters')}
        </button>
      </div>

      <div className={styles.filtersContainer}>
        {/* First row of filters */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <Select
              label={t('common.device')}
              value={filters.device}
              onChange={(value: string) => handleFilterChange('device', value)}
            >
              <Option value=''>{t('latestStates.allDevices')}</Option>
              {/* In a real case, this could be a dynamic list of devices */}
              <Option value='Device-1000'>Device-1000</Option>
              <Option value='Device-1001'>Device-1001</Option>
              <Option value='Device-1002'>Device-1002</Option>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.type')}
              value={filters.type}
              onChange={(value: string) => handleFilterChange('type', value)}
            >
              <Option value=''>{t('latestStates.allTypes')}</Option>
              {deviceTypes.map((type: string) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.brand')}
              value={filters.brand}
              onChange={(value: string) => handleFilterChange('brand', value)}
            >
              <Option value=''>{t('latestStates.allBrands')}</Option>
              {brands.map((brand: string) => (
                <Option key={brand} value={brand}>
                  {brand}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label={t('common.site')}
              value={filters.site}
              onChange={(value: string) => handleFilterChange('site', value)}
            >
              <Option value=''>{t('latestStates.allSites')}</Option>
              {sites.map((site: string) => (
                <Option key={site} value={site}>
                  {site}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Second row of filters */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <Select
              label={t('common.status')}
              value={filters.lastStatus}
              onChange={(value: string) => handleFilterChange('lastStatus', value)}
            >
              <Option value=''>{t('latestStates.allStatuses')}</Option>
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

          <div className={styles.filterGroup}>
            <DateSelector
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDateChange={handleDateChange}
              label={t('dateSelector.dateRange')}
            />
          </div>

          {/* Empty space to balance distribution */}
          <div className={styles.filterGroup}></div>
        </div>
      </div>
    </div>
  );
};

export default LatestStatesFilters;
