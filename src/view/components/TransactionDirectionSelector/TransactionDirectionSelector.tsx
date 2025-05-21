import { FunctionComponent } from 'react';

import ToggleButton, { ToggleButtonGroup } from '@view/elements/ToggleButton';
import Typography from '@view/elements/Typography';
import clsx from 'clsx';

import styles from './TransactionDirectionSelector.module.css';

export type TransactionDirection = 'buy' | 'sell';

interface TransactionDirectionSelectorProps {
  selectedValue: TransactionDirection;
  onChange: (value: TransactionDirection) => void;
}

const TransactionDirectionSelector: FunctionComponent<TransactionDirectionSelectorProps> = (
  props,
) => {
  const handleChange = (value: TransactionDirection) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <ToggleButtonGroup value={props.selectedValue} exclusive className={styles.root}>
      <ToggleButton
        value='buy'
        className={clsx(styles.button, styles.buy)}
        data-selected={props.selectedValue === 'buy'}
        selected={props.selectedValue === 'buy'}
        onClick={() => handleChange('buy')}
      >
        <Typography className={styles.buyText}>Buy</Typography>
      </ToggleButton>
      <ToggleButton
        value='sell'
        className={clsx(styles.button, styles.sell)}
        data-selected={props.selectedValue === 'sell'}
        selected={props.selectedValue === 'sell'}
        onClick={() => handleChange('sell')}
      >
        <Typography className={styles.sellText}>Sell</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TransactionDirectionSelector;
