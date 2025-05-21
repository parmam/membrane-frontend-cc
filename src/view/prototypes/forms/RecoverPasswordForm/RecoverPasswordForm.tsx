import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';

import useTheme from '@theme/useTheme';
import { ValidationErrors, validateEmail } from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';

interface RecoverPasswordFormProps {
  onLoginClick: () => void;
}

const RecoverPasswordForm: FunctionComponent<RecoverPasswordFormProps> = (props) => {
  const theme = useTheme();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!validateEmail(email)) {
      newErrors.email = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle password recovery logic here
      console.log('Recover password for:', email);
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {!submitted ? (
          <>
            <Box marginBottom='1rem'>
              <p style={{ color: theme.palette.text.primary, margin: 0 }}>
                {t('auth.recoverPasswordMessage')}
              </p>
            </Box>

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

            <Box marginTop='0.5rem'>
              <Button type='submit' variant='contained' color='primary' fullWidth>
                {t('auth.resetPassword')}
              </Button>
            </Box>
          </>
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center' gap='1.5rem'>
            <p style={{ color: theme.palette.text.primary, textAlign: 'center' }}>
              {t('auth.passwordResetSent', { email })}
            </p>
          </Box>
        )}

        <Box display='flex' justifyContent='center' gap='0.5rem'>
          <Button type='button' variant='text' color='primary' onClick={props.onLoginClick}>
            {t('auth.backToSignIn')}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RecoverPasswordForm;
