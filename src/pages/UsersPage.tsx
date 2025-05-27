import { UserData, dummyUserData } from '@/view/prototypes/Users/UsersTable/data';

import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';
import UsersFilters from '@view/prototypes/Users/UsersFilters/UsersFilters';
import UsersTable from '@view/prototypes/Users/UsersTable/UsersTable';

import styles from './UsersPage.module.css';

interface FilterState {
  name: string;
  lastName: string;
  email: string;
  profile: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
}

const UsersPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const [filteredData, setFilteredData] = useState<UserData[]>(dummyUserData);
  const [totalUsers] = useState<number>(dummyUserData.length);

  const handleFilterChange = (filters: FilterState) => {
    // Filter data based on selected filters
    const filtered = dummyUserData.filter((user) => {
      // Name filter
      if (filters.name && !user.nombre.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }

      // Last name filter
      if (
        filters.lastName &&
        !user.apellido.toLowerCase().includes(filters.lastName.toLowerCase())
      ) {
        return false;
      }

      // Email filter
      if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false;
      }

      // Profile filter
      if (filters.profile && !user.perfiles.includes(filters.profile)) {
        return false;
      }

      // Status filter
      if (filters.status && user.estado !== filters.status) {
        return false;
      }

      // Date filter - Would implement if we had date fields in our user data
      // Currently not applied since our user data doesn't include creation/update dates

      return true;
    });

    setFilteredData(filtered);
  };

  const handleEditUser = (user: UserData) => {
    // Handle edit user action
    console.log('Edit user:', user);
    // Would implement edit functionality here
  };

  const handleDeleteUser = (user: UserData) => {
    // Handle delete user action
    console.log('Delete user:', user);
    // Would implement delete functionality here
  };

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.pageHeader}>
        <ContentTitles title={t('pages.users.title')} subtitle={t('pages.users.subtitle')} />
        <UsersFilters onFilterChange={handleFilterChange} />

        <div className={styles.resultsInfo}>
          <span className={styles.resultCount}>
            {t('common.showing', { count: filteredData.length, total: totalUsers })}
          </span>
        </div>
      </div>

      <section className={styles.pageContent}>
        <UsersTable
          data={filteredData}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </section>
    </div>
  );
};

export default UsersPage;
