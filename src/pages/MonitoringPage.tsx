import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const MonitoringPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles
        title={t('pages.monitoring.title')}
        subtitle={t('pages.monitoring.subtitle')}
      />
    </div>
  );
};

export default MonitoringPage;
