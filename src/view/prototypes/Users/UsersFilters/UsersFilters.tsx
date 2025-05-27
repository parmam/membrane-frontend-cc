import { profileOptions, statusOptions } from '@/view/prototypes/Users/UsersTable/data';

import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DateSelector from '@view/components/DateSelector/DateSelector';
import Option from '@view/elements/Option/Option';
import Select from '@view/elements/Select/Select';

import styles from './UsersFilters.module.css';

interface UsersFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  name: string;
  lastName: string;
  email: string;
  profile: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
}

const UsersFilters: FunctionComponent<UsersFiltersProps> = (props) => {
  const { t } = useTranslation();
  const { onFilterChange } = props;

  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    lastName: '',
    email: '',
    profile: '',
    status: '',
    startDate: null,
    endDate: null,
  });

  // Handler for filter changes
  const handleFilterChange = (filterName: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [filterName]: value,
    };

    setFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Handler for date changes
  const handleDateChange = (startDate: string | null, endDate: string | null) => {
    const newFilters = {
      ...filters,
      startDate,
      endDate,
    };

    setFilters(newFilters);

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersRow}>
        <div className={styles.filterGroup}>
          <Select
            label={t('common.profile')}
            value={filters.profile}
            onChange={(value: string) => handleFilterChange('profile', value)}
          >
            <Option value=''>{t('users.filters.allProfiles')}</Option>
            {profileOptions.map((profile) => (
              <Option key={profile} value={profile}>
                {profile}
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
            <Option value=''>{t('users.filters.allStatuses')}</Option>
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </div>

        <div className={`${styles.filterGroup} ${styles.dateFilterGroup}`} style={{ zIndex: 999 }}>
          <DateSelector
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDateChange={handleDateChange}
            label={t('dateSelector.dateRange')}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersFilters;
