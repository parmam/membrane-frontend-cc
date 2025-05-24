import { FunctionComponent } from 'react';

import styles from './ContentTitles.module.css';

interface ContentTitlesProps {
  title: string;
  subtitle?: string;
}

const ContentTitles: FunctionComponent<ContentTitlesProps> = (props) => {
  return (
    <header className={styles.titleContainer}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.subtitle && <p className={styles.subtitle}>{props.subtitle}</p>}
    </header>
  );
};

export default ContentTitles;
