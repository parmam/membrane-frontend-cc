import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

const GroupsPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.groups.title')} subtitle={t('pages.groups.subtitle')} />
    </div>
  );
};

export default GroupsPage;
