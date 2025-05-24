import React from 'react';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';
import LastStatusTable from '../view/prototypes/LastStatusTable/LastStatusTable';

const LatestStatesPage: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <ContentTitles
        title='Estado de los dispositivos'
        subtitle='Monitoreo en tiempo real de todos los dispositivos en la red'
      />

      <section>
        <LastStatusTable />
      </section>
    </div>
  );
};

export default LatestStatesPage;
