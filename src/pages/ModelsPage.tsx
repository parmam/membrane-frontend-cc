import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const ModelsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.models.title')} subtitle={t('pages.models.subtitle')} />
    </div>
  );
};

export default ModelsPage;
