import {
  MonitoringData,
  dummyMonitoringData,
} from '@/view/prototypes/Monitoring/MonitoringTable/data';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { faCircleExclamation, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VirtualizedListConfig } from '@view/elements/Table/config';
import clsx from 'clsx';

import styles from './MonitoringMobileView.module.css';

interface MonitoringCardsProps {
  data: MonitoringData[];
  className?: string;
  config?: Partial<VirtualizedListConfig>;
}

const MonitoringCards = ({ data = dummyMonitoringData, className }: MonitoringCardsProps) => {
  const { t } = useTranslation();
  const [visibleData, setVisibleData] = useState<MonitoringData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Load initial data
  useEffect(() => {
    const initialItems = data.slice(0, itemsPerPage);
    setVisibleData(initialItems);
  }, [data]);

  // Handle scroll to load more data
  const handleLoadMore = () => {
    if (loading || visibleData.length >= data.length) return;

    setLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = data.slice(0, endIndex);

      setVisibleData(newItems);
      setPage(nextPage);
      setLoading(false);
    }, 500);
  };

  // Detect when user reaches bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleData, loading, data]);

  return (
    <div className={clsx(styles.mobileContainer, className)}>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileCount}>
          {visibleData.length} / {data.length}
        </div>
      </div>

      <div className={styles.cardContainer}>
        {visibleData.map((item) => (
          <div
            key={item.id}
            className={clsx(styles.deviceCard, item.critico && styles.criticalCard)}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{item.dispositivo}</h3>
              {item.critico && (
                <FontAwesomeIcon icon={faCircleExclamation} className={styles.criticalIcon} />
              )}
            </div>

            <div className={styles.cardStatus}>
              <span
                className={clsx(
                  styles.statusIndicator,
                  styles[`status${item.estado.replace(/\s+/g, '')}`],
                )}
              >
                {item.estado}
              </span>
            </div>

            <div className={styles.cardDetails}>
              <div className={styles.cardDetail}>
                <span className={styles.cardDetailLabel}>{t('monitoring.fecha')}</span>
                <span className={styles.cardDetailValue}>{item.fecha}</span>
              </div>

              <div className={styles.cardDetail}>
                <span className={styles.cardDetailLabel}>{t('monitoring.ubicacion')}</span>
                <span className={styles.cardDetailValue}>{item.ubicacion}</span>
              </div>

              <div className={styles.cardDetail}>
                <span className={styles.cardDetailLabel}>{t('monitoring.plano')}</span>
                <span className={styles.cardDetailValue}>{item.plano}</span>
              </div>

              <div className={styles.cardDetail}>
                <span className={styles.cardDetailLabel}>{t('monitoring.uptime')}</span>
                <span className={styles.cardDetailValue}>{item.uptime}</span>
              </div>

              <div className={styles.cardDetail}>
                <span className={styles.cardDetailLabel}>{t('monitoring.verImagen')}</span>
                <a
                  href={item.imagen}
                  className={styles.viewImageLink}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon icon={faImage} />
                </a>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className={styles.loadingCardContainer}>
            <div className={styles.loadingIndicator}></div>
          </div>
        )}

        {!loading && visibleData.length < data.length && (
          <div className={styles.scrollHint}>
            {t('common.scrollForMore', {
              visible: visibleData.length,
              total: data.length,
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringCards;
