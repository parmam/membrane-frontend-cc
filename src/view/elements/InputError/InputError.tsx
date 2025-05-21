import { FunctionComponent } from 'react';

import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@view/elements/Typography';

import styles from './InputError.module.css';

interface InputErrorProps {
  error: Error;
}

const InputError: FunctionComponent<InputErrorProps> = (props) => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faTriangleExclamation} color='var(--color-error-main)' />
      <Typography color='error'>{props.error.message}</Typography>
    </div>
  );
};

export default InputError;
