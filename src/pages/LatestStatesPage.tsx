import React from 'react';

import LastStatusTable from '../view/prototypes/LastStatusTable/LastStatusTable';

const LatestStatesPage: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <header>
        <h1>Estado de los dispositivos</h1>
        <p>Monitoreo en tiempo real de todos los dispositivos en la red</p>
      </header>

      <section>
        <LastStatusTable />
      </section>
    </div>
  );
};

export default LatestStatesPage;
