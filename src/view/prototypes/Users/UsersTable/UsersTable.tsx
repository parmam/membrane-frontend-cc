import UsersMobileView from '@/view/prototypes/Users/UsersMobileView/UsersMobileView';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowSize from '@hooks/useWindowSize';
import { VirtualizedTable } from '@view/elements/Table';
import { VirtualizedListConfig } from '@view/elements/Table/config';
import clsx from 'clsx';

import styles from './UsersTable.module.css';
import { UserData, dummyUserData } from './data';

// Media query for mobile detection
const MOBILE_BREAKPOINT = 768;

interface UsersTableProps {
  data?: UserData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
  onEditUser?: (user: UserData) => void;
  onDeleteUser?: (user: UserData) => void;
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

const UsersTable = ({
  data = dummyUserData,
  className,
  config = {},
  onEditUser,
  onDeleteUser,
}: UsersTableProps) => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize(MOBILE_BREAKPOINT);
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);

  // Create configuration once to avoid unnecessary re-renders
  const mergedConfig = useMemo(() => {
    return { ...DEFAULT_TABLE_CONFIG, ...config };
  }, [config]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openActionsId && !(event.target as Element).closest(`.${styles.actionsDropdown}`)) {
        setOpenActionsId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openActionsId]);

  const toggleActions = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenActionsId(openActionsId === id ? null : id);
  };

  const handleEdit = (user: UserData, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenActionsId(null);
    if (onEditUser) onEditUser(user);
  };

  const handleDelete = (user: UserData, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenActionsId(null);
    if (onDeleteUser) onDeleteUser(user);
  };

  // Function to render the table header
  const renderHead = () => (
    <tr>
      <th className={styles.tableHeadCell} style={{ width: '15%' }}>
        {t('common.name').toUpperCase()}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '15%' }}>
        {t('common.lastName').toUpperCase()}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '25%' }}>
        {t('common.email').toUpperCase()}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '25%' }}>
        {t('common.profile').toUpperCase()}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '12%' }}>
        {t('common.status').toUpperCase()}
      </th>
      <th className={styles.tableHeadCell} style={{ width: '8%', textAlign: 'center' }}>
        {t('users.actions.title', 'ACCIONES')}
      </th>
    </tr>
  );

  // Function to render each table row
  const renderRow = (row: UserData, index: number) => (
    <tr key={row.id} className={styles.tableRow}>
      <td className={styles.tableCell}>{row.nombre}</td>
      <td className={styles.tableCell}>{row.apellido}</td>
      <td className={styles.tableCell}>{row.email}</td>
      <td className={styles.tableCell}>
        <div className={styles.profilesList}>
          {row.perfiles.map((profile, idx) => (
            <span key={idx} className={styles.profileBadge}>
              {profile}
            </span>
          ))}
        </div>
      </td>
      <td className={styles.tableCell} style={{ textAlign: 'center' }}>
        <span
          className={clsx(
            styles.statusIndicator,
            styles[`status${row.estado === 'Activo' ? 'Active' : 'Inactive'}`],
          )}
        >
          {row.estado}
        </span>
      </td>
      <td className={styles.tableCell} style={{ textAlign: 'center' }}>
        <div className={styles.actionsContainer}>
          <button
            className={styles.actionsButton}
            onClick={(e) => toggleActions(row.id, e)}
            aria-label='User actions'
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>

          {openActionsId === row.id && (
            <div className={styles.actionsDropdown}>
              <button className={styles.actionItem} onClick={(e) => handleEdit(row, e)}>
                {t('users.actions.edit')}
              </button>
              <button className={styles.actionItem} onClick={(e) => handleDelete(row, e)}>
                {t('users.actions.delete')}
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  // Function to render custom footer
  const renderFooter = (visibleData: UserData[], allData: UserData[], loading: boolean) => (
    <>
      {loading && (
        <tfoot>
          <tr className={styles.loadingRow}>
            <td colSpan={6} style={{ textAlign: 'center' }}>
              <div className={styles.loadingIndicator}></div>
            </td>
          </tr>
        </tfoot>
      )}

      {visibleData.length < allData.length && !loading && (
        <tfoot>
          <tr>
            <td colSpan={6}>
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

  // For mobile view, render the mobile component
  if (isMobile) {
    return (
      <UsersMobileView
        data={data}
        className={className}
        config={mergedConfig}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
      />
    );
  }

  // Desktop view with virtualized table
  return (
    <div
      className={styles.usersTableWrapper}
      style={{ height: `${mergedConfig.containerHeight}px` }}
    >
      <VirtualizedTable
        data={data}
        className={styles.usersTableWrapper}
        containerClassName={styles.tableContainer}
        config={mergedConfig}
        renderHead={renderHead}
        renderRow={renderRow}
        renderFooter={renderFooter}
      />
    </div>
  );
};

export default UsersTable;
