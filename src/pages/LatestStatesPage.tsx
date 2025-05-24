import { FunctionComponent } from 'react';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';
import LatestStatesFilters from '../view/components/LatestStatesFilters/LatestStatesFilters';
import LastStatusTable from '../view/prototypes/LastStatusTable/LastStatusTable';

const LatestStatesPage: FunctionComponent = () => {
  return (
    <div style={{ width: '100%' }}>
      <ContentTitles
        title='Estado de los dispositivos'
        subtitle='Monitoreo en tiempo real de todos los dispositivos en la red'
      />
      <LatestStatesFilters />

      <section>
        <LastStatusTable />
      </section>
    </div>
  );
};

export default LatestStatesPage;
