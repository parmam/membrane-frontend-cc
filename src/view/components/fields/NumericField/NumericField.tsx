import { FunctionComponent, useCallback, useRef, useState } from 'react';

import { FieldError } from '@models/Error';
import Box from '@view/elements/Box';
import Input, { InputProps } from '@view/elements/Input';
import InputError from '@view/elements/InputError';

import styles from './NumericField.module.css';

type PrefixType = '$' | '€' | '£';

interface NumericFieldProps
  extends Omit<InputProps, 'onChange' | 'onBlur' | 'value' | 'onError' | 'error'> {
  separator?: '.' | ',';
  precision?: number;
  prefix: PrefixType;
  value?: string;
  error?: FieldError;
  minValue?: number;
  maxValue?: number;
  onError?: (error: FieldError) => void;
  onChange?: (value: string) => void;
}

const sanitizeValue = (value: string): string => {
  return value.replace(/[^0-9]/g, '');
};

const isValidInput = (value: string): boolean => {
  return /^[0-9.,]*$/.test(value);
};

const formatWithThousandSeparator = (value: string, separator: '.' | ',' = '.'): string => {
  const decimalSeparator = separator;
  const thousandSeparator = separator === '.' ? ',' : '.';
  const parts = value.split(decimalSeparator);
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? parts[1] : '';
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  return decimalPart
    ? `${formattedIntegerPart}${decimalSeparator}${decimalPart}`
    : formattedIntegerPart;
};

const formatValueWithDecimal = (
  value: string,
  precision?: number,
  separator: '.' | ',' = '.',
): string => {
  if (!precision) return value;
  const digits = sanitizeValue(value);
  if (!digits.length) return `0${separator}${'0'.repeat(precision)}`;
  let wholePart = '0';
  let decimalPart = '0'.repeat(precision);
  if (digits.length <= precision) {
    decimalPart = digits.padStart(precision, '0');
  } else {
    wholePart = digits.slice(0, digits.length - precision);
    decimalPart = digits.slice(digits.length - precision);
  }
  return `${wholePart}${separator}${decimalPart}`;
};

const removePrefix = (value: string, prefix: PrefixType): string => {
  return value.replace(prefix, '').trim();
};

const addPrefix = (value: string, prefix: PrefixType): string => {
  return `${prefix}${value}`;
};

const processInputValue = (
  inputValue: string,
  precision: number = 2,
  minValue?: number,
  maxValue?: number,
  separator: '.' | ',' = '.',
): { value: string; isValid: boolean } => {
  if (inputValue === '') {
    return { value: '', isValid: true };
  }

  const cleanValue = inputValue.replace(/[.,]/g, '');
  const dotIndex = cleanValue.length - precision;

  const [integer, decimal] = (
    cleanValue.slice(0, dotIndex) +
    '.' +
    cleanValue.slice(dotIndex)
  ).split('.');

  const rawFormattedValue =
    precision > 0 ? `${Number(integer)}${separator}${decimal}` : Number(integer).toString();
  const valueForValidation = rawFormattedValue.replace(',', '.');
  const numValue = Number(valueForValidation);

  const isValid =
    (minValue === undefined || numValue >= minValue) &&
    (maxValue === undefined || numValue <= maxValue);

  return {
    value: rawFormattedValue,
    isValid,
  };
};

const getDefaultValue = (precision?: number, separator: '.' | ',' = '.'): string => {
  return precision ? `0${separator}${'0'.repeat(precision)}` : '0';
};

const initializeDisplayValue = (
  value: string | undefined,
  precision?: number,
  separator: '.' | ',' = '.',
): string => {
  if (!value) return getDefaultValue(precision, separator);

  return precision
    ? formatValueWithDecimal(sanitizeValue(value), precision, separator)
    : sanitizeValue(value) || '0';
};

const initializeRawDigits = (value: string | undefined, prefix: PrefixType): string => {
  return sanitizeValue(removePrefix(value || '0', prefix)) || '0';
};

const NumericField: FunctionComponent<NumericFieldProps> = (props) => {
  const { error, onError, ...inputProps } = props;
  const separator = props.separator || '.';
  const inputRef = useRef<HTMLInputElement>(null);

  const [displayValue, setDisplayValue] = useState<string>(
    initializeDisplayValue(props.value, props.precision, separator),
  );

  const [rawDigits, setRawDigits] = useState<string>(
    initializeRawDigits(props.value, props.prefix),
  );

  const handleChange = useCallback(
    (inputValue: string) => {
      if (inputValue === '') {
        setRawDigits('');
        setDisplayValue('');

        if (props.onChange) {
          props.onChange('');
        }
        return;
      }

      const normalizedInput =
        separator === '.'
          ? inputValue.replace(/,/g, '')
          : inputValue.replace(/\./g, '').replace(/,/g, '.');

      if (!isValidInput(normalizedInput)) {
        return;
      }

      const { value, isValid } = processInputValue(
        normalizedInput,
        props.precision ?? 2,
        props.minValue,
        props.maxValue,
        separator,
      );

      if (isValid) {
        setRawDigits(normalizedInput.replace(/[.,]/g, ''));
        const formattedDisplayValue = formatWithThousandSeparator(value, separator);
        setDisplayValue(formattedDisplayValue);

        if (props.onChange) {
          const valueForJS = separator === '.' ? value : value.replace(',', '.');
          props.onChange(valueForJS);
        }
      }
    },
    [props.precision, props.onChange, props.minValue, props.maxValue, separator],
  );

  const handleFocus = useCallback(() => {
    if (props.precision) {
      setDisplayValue(formatValueWithDecimal(rawDigits, props.precision, separator));
    } else {
      setDisplayValue(removePrefix(displayValue, props.prefix));
    }
  }, [displayValue, props.prefix, props.precision, rawDigits, separator]);

  const handleBlur = useCallback(() => {
    let formattedValue;

    if (props.precision) {
      formattedValue = formatValueWithDecimal(rawDigits || '0', props.precision, separator);
      formattedValue = formatWithThousandSeparator(formattedValue, separator);
    } else {
      formattedValue = rawDigits || '0';
    }

    setDisplayValue(addPrefix(formattedValue, props.prefix));
  }, [rawDigits, props.precision, props.prefix, separator]);

  return (
    <Box className={styles.root}>
      <Input
        {...inputProps}
        prefix={props.prefix}
        error={!!error}
        value={displayValue}
        type='text'
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
      />
      {error && <InputError error={error} />}
    </Box>
  );
};

export default NumericField;
