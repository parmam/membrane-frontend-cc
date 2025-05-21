import { FunctionComponent, useState } from 'react';

import useTheme from '@theme/useTheme';
import { ValidationErrors, validateEmail, validatePassword } from '@utils/field-validations';
import Box from '@view/elements/Box';
import Button from '@view/elements/Button';
import Input from '@view/elements/Input';

interface LoginFormProps {
  onRegisterClick: () => void;
  onRecoverClick: () => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const theme = useTheme();
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
      <Box display='flex' flexDirection='column' gap='1.5rem'>
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

        <Input
          label='Password'
          type='password'
          value={password}
          onChange={setPassword}
          error={errors.password}
          placeholder='••••••••'
          autoComplete='current-password'
          required
        />

        <Box marginTop='0.5rem'>
          <Button type='submit' variant='contained' color='primary' fullWidth>
            Sign In
          </Button>
        </Box>

        <Box display='flex' justifyContent='center' gap='0.5rem'>
          <Button type='button' variant='text' color='primary' onClick={props.onRecoverClick}>
            Forgot Password?
          </Button>
        </Box>

        <Box display='flex' justifyContent='center' gap='0.5rem'>
          <span style={{ color: theme.palette.text.primary }}>Don't have an account?</span>
          <Button type='button' variant='text' color='primary' onClick={props.onRegisterClick}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginForm;
