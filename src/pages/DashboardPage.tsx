import React from 'react';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <ContentTitles
        title='Dashboard Page'
        subtitle='This is the dashboard page with overview information.'
      />
    </div>
  );
};

export default DashboardPage;
