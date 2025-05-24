import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

const MonitoringPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles
        title={t('pages.monitoring.title')}
        subtitle={t('pages.monitoring.subtitle')}
      />
      <p>{t('pages.monitoring.description')}</p>
    </div>
  );
};

export default MonitoringPage;
