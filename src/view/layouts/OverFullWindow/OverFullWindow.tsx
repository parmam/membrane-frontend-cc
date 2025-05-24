import { FunctionComponent, ReactNode } from 'react';

import Box from '@view/elements/Box';
import MainHeader from '@view/prototypes/Headers/MainHeader/MainHeader';

import styles from './OverFullWindow.module.css';

interface OverFullScreenProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

const OverFullScreen: FunctionComponent<OverFullScreenProps> = (props) => {
  return (
    <Box className={styles.root}>
      <MainHeader title={props.title} onClose={props.onClose} />
      <Box>{props.children}</Box>
    </Box>
  );
};

export default OverFullScreen;
