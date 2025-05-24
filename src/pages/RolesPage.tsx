import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

const RolesPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.roles.title')} subtitle={t('pages.roles.subtitle')} />
    </div>
  );
};

export default RolesPage;
