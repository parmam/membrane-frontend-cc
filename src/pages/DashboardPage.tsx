import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.dashboard.title')} subtitle={t('pages.dashboard.subtitle')} />
    </div>
  );
};

export default DashboardPage;
