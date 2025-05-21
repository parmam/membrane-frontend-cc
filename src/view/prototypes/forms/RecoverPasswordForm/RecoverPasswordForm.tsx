import { FunctionComponent, useState } from 'react';

import { ValidationErrors, validateEmail } from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';

interface RecoverPasswordFormProps {
  onLoginClick: () => void;
}

const RecoverPasswordForm: FunctionComponent<RecoverPasswordFormProps> = (props) => {
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
              <p style={{ color: 'white', margin: 0 }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </Box>

            <Input
              label='Email'
              type='email'
              value={email}
              onChange={setEmail}
              error={errors.email}
              placeholder='email@example.com'
              autoComplete='email'
              required
            />

            <Box marginTop='0.5rem'>
              <Button type='submit' variant='contained' color='primary' fullWidth>
                Reset Password
              </Button>
            </Box>
          </>
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center' gap='1.5rem'>
            <p style={{ color: 'white', textAlign: 'center' }}>
              If an account exists with the email <strong>{email}</strong>, you will receive a
              password reset link. Please check your email.
            </p>
          </Box>
        )}

        <Box display='flex' justifyContent='center' gap='0.5rem'>
          <Button type='button' variant='text' color='primary' onClick={props.onLoginClick}>
            Back to Sign In
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default RecoverPasswordForm;
