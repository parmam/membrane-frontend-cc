import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@store/index';
import useTheme from '@theme/useTheme';
import {
  ValidationErrors,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';
import InputError from '@view/elements/InputError';

interface RegisterFormProps {
  onLoginClick: () => void;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useI18n();
  const { register, error: authError } = useAuth();
  const { loading: userLoading, error: userError } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const isLoading = userLoading.createUserThunk;
  const error = authError || userError;

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!firstName) {
      newErrors.firstName = true;
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = true;
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register({
          firstName,
          lastName,
          email,
          password,
          passwordConfirmation: confirmPassword,
          roles: '[]',
          places: '[]',
          profilePictureUrl: '',
        });

        // Redirige al home después del registro exitoso
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Register error:', err);
        // El error ya está manejado por el Redux state
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {error && <InputError error={new Error(error)} />}

        <Input
          label={t('auth.firstName')}
          type='text'
          value={firstName}
          onChange={setFirstName}
          error={errors.firstName}
          placeholder={t('auth.firstName')}
          autoComplete='given-name'
          required
          disabled={isLoading}
        />

        <Input
          label={t('auth.lastName')}
          type='text'
          value={lastName}
          onChange={setLastName}
          error={errors.lastName}
          placeholder={t('auth.lastName')}
          autoComplete='family-name'
          required
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />

        <Box marginTop='0.5rem'>
          <Button type='submit' variant='contained' color='primary' fullWidth disabled={isLoading}>
            {isLoading ? t('common.loading') : t('auth.createAccount')}
          </Button>
        </Box>

        <Box display='flex' justifyContent='center' gap='0.5rem'>
          <span style={{ color: theme.palette.text.primary }}>{t('auth.alreadyHaveAccount')}</span>
          <Button
            type='button'
            variant='text'
            color='primary'
            onClick={props.onLoginClick}
            disabled={isLoading}
          >
            {t('auth.login')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterForm;
