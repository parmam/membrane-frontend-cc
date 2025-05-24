import { useI18n } from '@/i18n';

import { FunctionComponent, useRef, useState } from 'react';

import { FieldError } from '@models/Error';
import Box from '@view/elements/Box';
import Input, { InputProps } from '@view/elements/Input';
import InputError from '@view/elements/InputError';
import Typography from '@view/elements/Typography';

import styles from './TextField.module.css';

type FieldType = 'email' | 'password' | 'text';

const TextField: FunctionComponent<TextFieldProps> = (props) => {
  const { t } = useI18n();
  const [value, setValue] = useState<string>(props.value);
  const [error, setError] = useState<FieldError | undefined>(undefined);

  // Mapeo de errores con traducciones
  const errorMap: Record<FieldType, FieldError> = {
    email: {
      name: 'email',
      message: t('validation.invalidEmail'),
      code: 'invalid_email',
    },
    password: {
      name: 'password',
      message: t('validation.invalidPassword'),
      code: 'invalid_password',
    },
    text: {
      name: 'text',
      message: t('validation.invalidText'),
      code: 'invalid_text',
    },
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (value: string) => {
    setValue(value);
  };

  const blurHandler = () => {
    if (props.fieldType === 'email' && !isEmailFormat(value)) {
      setError(errorMap.email);
    } else if (props.fieldType === 'password' && !isPasswordFormat(value)) {
      setError(errorMap.password);
    } else {
      setError(undefined);
      if (props.onChange) {
        props.onChange(value);
      }
    }
  };

  const onFocusHandler = () => {
    setError(undefined);
  };

  const { onError, fieldType, title, ...inputProps } = props;

  return (
    <Box className={styles.root}>
      {title && <Typography>{t(title)}</Typography>}
      <Input
        {...inputProps}
        ref={inputRef}
        error={!!error}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={onFocusHandler}
      />
      {error && <InputError error={error} />}
    </Box>
  );
};

interface TextFieldProps extends Omit<InputProps, 'onChange' | 'onBlur' | 'value' | 'onError'> {
  fieldType: FieldType;
  error?: boolean;
  value: string;
  title?: string;
  onError?: (error: FieldError) => void;
  onChange?: (value: string) => void;
}

const isEmailFormat = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isPasswordFormat = (value: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
};

export default TextField;
