import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';

import useTheme from '@theme/useTheme';
import {
  ValidationErrors,
  validateBusinessName,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validatePhoneNumber,
} from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';

interface RegisterFormProps {
  onLoginClick: () => void;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useI18n();
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!validateBusinessName(businessName)) {
      newErrors.businessName = true;
      isValid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = true;
      isValid = false;
    }

    if (!validatePassword(password, 8)) {
      newErrors.password = true;
      isValid = false;
    }

    if (!validatePasswordMatch(password, confirmPassword)) {
      newErrors.confirmPassword = true;
      isValid = false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle registration logic here
      console.log('Register with:', { businessName, email, password, phoneNumber });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        <Input
          label={t('auth.businessName')}
          type='text'
          value={businessName}
          onChange={setBusinessName}
          error={errors.businessName}
          placeholder={t('auth.businessName')}
          autoComplete='organization'
          required
        />

        <Input
          label={t('auth.email')}
          type='email'
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder={t('auth.emailPlaceholder')}
          autoComplete='email'
          required
        />

        <Input
          label={t('auth.password')}
          type='password'
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete='new-password'
          required
        />

        <Input
          label={t('auth.confirmPassword')}
          type='password'
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete='new-password'
          required
        />

        <Input
          label={t('auth.phoneNumber')}
          type='tel'
          value={phoneNumber}
          onChange={setPhoneNumber}
          error={errors.phoneNumber}
          placeholder='+1 (123) 456-7890'
          autoComplete='tel'
          required
        />

        <Box marginTop='0.5rem'>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            {t('auth.createAccount')}
          </Button>
        </Box>

        <Box display='flex' justifyContent='center' gap='0.5rem'>
          <span style={{ color: theme.palette.text.primary }}>{t('auth.alreadyHaveAccount')}</span>
          <Button type='button' variant='text' color='primary' onClick={props.onLoginClick}>
            {t('auth.login')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterForm;
