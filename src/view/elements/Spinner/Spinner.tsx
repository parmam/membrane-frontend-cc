import { CSSProperties, FunctionComponent } from 'react';

import clsx from 'clsx';

import styles from './Spinner.module.css';

type SpinnerSize = 'small' | 'medium' | 'large';
type SpinnerColor = 'primary' | 'secondary' | 'success' | 'error';

export interface SpinnerProps {
  label?: string;
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
  style?: CSSProperties;
}

const Spinner: FunctionComponent<SpinnerProps> = ({
  label = 'Cargando...',
  size = 'medium',
  color = 'primary',
  className,
  style,
}) => {
  return (
    <div
      role='progressbar'
      aria-label={label}
      className={clsx(styles.spinner, styles[size], styles[color], className)}
      style={style}
    >
      <svg className={styles.svg} viewBox='22 22 44 44'>
        <circle className={styles.circle} cx='44' cy='44' r='20' fill='none' strokeWidth='4' />
      </svg>
    </div>
  );
};

export default Spinner;
