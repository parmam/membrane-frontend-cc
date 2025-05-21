import { FunctionComponent } from 'react';

import Option from '@view/elements/Option';
import Select from '@view/elements/Select';

import styles from './CurrencySelector.module.css';

export interface CurrencyOption {
  id: number;
  label: string;
  value?: string;
}

interface CurrencySelectorProps {
  selectedValue: number;
  options: CurrencyOption[];
  onChange?: (value: number) => void;
}

const CurrencySelector: FunctionComponent<CurrencySelectorProps> = (props) => {
  const handleChange = (value: number) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <Select
      label='Select a crypto'
      className={styles.root}
      value={props.selectedValue}
      onChange={handleChange}
    >
      {props.options.map((option) => (
        <Option key={option.id} value={option.id} className={styles.option}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CurrencySelector;
