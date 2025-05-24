import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const BrandsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.brands.title')} subtitle={t('pages.brands.subtitle')} />
    </div>
  );
};

export default BrandsPage;
