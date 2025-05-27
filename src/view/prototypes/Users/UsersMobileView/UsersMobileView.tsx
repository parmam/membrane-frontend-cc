import { UserData } from '@/view/prototypes/Users/UsersTable/data';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VirtualizedListConfig } from '@view/elements/Table/config';
import clsx from 'clsx';

import styles from './UsersMobileView.module.css';

interface UsersMobileViewProps {
  data: UserData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
  onEditUser?: (user: UserData) => void;
  onDeleteUser?: (user: UserData) => void;
}

const UsersMobileView = ({
  data,
  className,
  config = {},
  onEditUser,
  onDeleteUser,
}: UsersMobileViewProps) => {
  const { t } = useTranslation();
  const [visibleData, setVisibleData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);

  // Configuration setup
  const mergedConfig = useMemo(() => {
    return {
      itemsPerPage: 5,
      ...config,
    };
  }, [config]);

  // Load initial data
  useEffect(() => {
    const initialItems = data.slice(0, mergedConfig.itemsPerPage);
    setVisibleData(initialItems);
  }, [data, mergedConfig.itemsPerPage]);

  // Handle scroll to load more
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const threshold = 300; // 300px before the end

      if (scrollPosition + windowHeight > fullHeight - threshold) {
        loadMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, visibleData, data]);

  // Load more items
  const loadMoreItems = () => {
    if (visibleData.length >= data.length) return;

    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const currentLength = visibleData.length;
      const nextItems = data.slice(currentLength, currentLength + mergedConfig.itemsPerPage);

      setVisibleData((prev) => [...prev, ...nextItems]);
      setLoading(false);
    }, 500);
  };

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

  const hasMore = visibleData.length < data.length;

  return (
    <div className={clsx(styles.cardsContainer, className)}>
      <div className={styles.mobileHeader}>
        <span className={styles.mobileCount}>
          {t('common.showing', { count: visibleData.length, total: data.length })}
        </span>
      </div>

      {visibleData.map((user) => (
        <div key={user.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.userName}>{`${user.nombre} ${user.apellido}`}</h3>
            <div className={styles.actionsContainer}>
              <button
                className={styles.actionsButton}
                onClick={(e) => toggleActions(user.id, e)}
                aria-label={t('users.actions.title', 'User actions')}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>

              {openActionsId === user.id && (
                <div className={styles.actionsDropdown}>
                  <button className={styles.actionItem} onClick={(e) => handleEdit(user, e)}>
                    {t('users.actions.edit')}
                  </button>
                  <button className={styles.actionItem} onClick={(e) => handleDelete(user, e)}>
                    {t('users.actions.delete')}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>{t('common.email').toUpperCase()}</div>
              <div className={styles.infoValue}>{user.email}</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLabel}>{t('common.profile').toUpperCase()}</div>
              <div className={styles.profilesContainer}>
                {user.perfiles.map((profile, idx) => (
                  <span key={idx} className={styles.profileBadge}>
                    {profile}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <span
              className={clsx(
                styles.statusIndicator,
                styles[`status${user.estado === 'Activo' ? 'Active' : 'Inactive'}`],
              )}
            >
              {user.estado}
            </span>
          </div>
        </div>
      ))}

      {loading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingIndicator}>{t('common.loading')}</div>
        </div>
      )}

      {hasMore && !loading && (
        <div className={styles.scrollHint}>
          {t('common.scrollForMore', { visible: visibleData.length, total: data.length })}
        </div>
      )}
    </div>
  );
};

export default UsersMobileView;
