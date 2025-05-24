import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import ContentTitles from '@view/components/ContentTitles/ContentTitles';

const FirmwaresPage: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentTitles title={t('pages.firmwares.title')} subtitle={t('pages.firmwares.subtitle')} />
    </div>
  );
};

export default FirmwaresPage;
