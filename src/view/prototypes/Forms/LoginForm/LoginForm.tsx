import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';

import useTheme from '@theme/useTheme';
import { ValidationErrors, validateEmail, validatePassword } from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';
import Typography from '@view/elements/Typography';

import styles from './LoginForm.module.css';

interface LoginFormProps {
  onRegisterClick: () => void;
  onRecoverClick: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useI18n();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log('Login with:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={styles.formContainer}>
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
          autoComplete='current-password'
          required
        />

        <Box className={styles.actionButton}>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            {t('auth.login')}
          </Button>
        </Box>

        <Box className={`${styles.linkContainer} ${styles.forgotPasswordLink}`}>
          <Button type='button' variant='text' color='primary' onClick={props.onRecoverClick}>
            {t('auth.forgotPassword')}
          </Button>
        </Box>

        <Box className={styles.linkContainer}>
          <Typography variant='body2' color='secondary'>
            {t('auth.dontHaveAccount')}
          </Typography>
          <Button type='button' variant='text' color='primary' onClick={props.onRegisterClick}>
            {t('auth.register')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
