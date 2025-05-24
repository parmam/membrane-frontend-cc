import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

const BrandsPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.brands.title')} subtitle={t('pages.brands.subtitle')} />
    </div>
  );
};

export default BrandsPage;
