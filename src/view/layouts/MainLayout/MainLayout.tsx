import { FunctionComponent, ReactNode } from 'react';

import useTheme from '@theme/useTheme';
import Box from '@view/elements/Box';
import MainHeader from '@view/prototypes/headers/MainHeader';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = (props) => {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.background.default}>
      <MainHeader title={'Home'} />
      {props.children}
    </Box>
  );
};

export default MainLayout;
