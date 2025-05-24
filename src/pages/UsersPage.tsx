import React from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '../view/components/ContentTitles/ContentTitles';

const UsersPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.users.title')} subtitle={t('pages.users.subtitle')} />
    </div>
  );
};

export default UsersPage;
