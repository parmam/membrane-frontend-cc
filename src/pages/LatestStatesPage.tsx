import React from 'react';

import LastStatusTable from '../view/prototypes/LastStatusTable/LastStatusTable';
import styles from './LatestStatesPage.module.css';

const LatestStatesPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Estado de los dispositivos</h1>
        <p className={styles.subtitle}>
          Monitoreo en tiempo real de todos los dispositivos en la red
        </p>
      </header>

      <section className={styles.tableSection}>
        <LastStatusTable />
      </section>
    </div>
  );
};

export default LatestStatesPage;
