import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useTheme from '@theme/useTheme';
import { ValidationErrors, validateEmail, validatePassword } from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';
import InputError from '@view/elements/InputError';
import Typography from '@view/elements/Typography';

import styles from './LoginForm.module.css';

interface LoginFormProps {
  onRegisterClick: () => void;
  onRecoverClick: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useI18n();
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!validateEmail(email)) {
      newErrors.email = true;
      isValid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login({ email, password });

        // Redirige a donde el usuario intentaba ir originalmente, o al home
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Login error:', error);
        // El error ya está manejado por el Redux state
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.formContainer}>
        {error && <InputError error={new Error(error)} />}

        <Input
          label={t('auth.email')}
          type='email'
          value={email}
          onChange={setEmail}
          error={errors.email}
          placeholder={t('auth.emailPlaceholder')}
          autoComplete='email'
          required
          disabled={loading.loginThunk}
        />

        <Input
          label={t('auth.password')}
          type='password'
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete='current-password'
          required
          disabled={loading.loginThunk}
        />

        <Box className={styles.actionButton}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            disabled={loading.loginThunk}
          >
            {loading.loginThunk ? t('common.loading') : t('auth.login')}
          </Button>
        </Box>

        <Box className={`${styles.linkContainer} ${styles.forgotPasswordLink}`}>
          <Button
            type='button'
            variant='text'
            color='primary'
            onClick={props.onRecoverClick}
            disabled={loading.loginThunk}
          >
            {t('auth.forgotPassword')}
          </Button>
        </Box>

        <Box className={styles.linkContainer}>
          <Typography variant='body2' color='secondary'>
            {t('auth.dontHaveAccount')}
          </Typography>
          <Button
            type='button'
            variant='text'
            color='primary'
            onClick={props.onRegisterClick}
            disabled={loading.loginThunk}
          >
            {t('auth.register')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
