import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const SitesPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.sites.title')} subtitle={t('pages.sites.subtitle')} />
    </div>
  );
};

export default SitesPage;
