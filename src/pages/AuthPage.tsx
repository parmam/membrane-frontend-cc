import { FunctionComponent, useState } from 'react';

import AuthLayout from '@view/layouts/AuthLayout/AuthLayout';
import LoginForm from '@view/prototypes/forms/LoginForm/LoginForm';
import RecoverPasswordForm from '@view/prototypes/forms/RecoverPasswordForm/RecoverPasswordForm';
import RegisterForm from '@view/prototypes/forms/RegisterForm/RegisterForm';

type AuthFormType = 'login' | 'register' | 'recover';

const AuthPage: FunctionComponent = () => {
  const [formType, setFormType] = useState<AuthFormType>('login');

  const handleSwitchForm = (type: AuthFormType) => {
    setFormType(type);
  };

  const getPageTitle = () => {
    switch (formType) {
      case 'login':
        return 'Sign In';
      case 'register':
        return 'Create Account';
      case 'recover':
        return 'Recover Password';
    }
  };

  return (
    <AuthLayout title={getPageTitle()}>
      {formType === 'login' && (
        <LoginForm
          onRegisterClick={() => handleSwitchForm('register')}
          onRecoverClick={() => handleSwitchForm('recover')}
        />
      )}

      {formType === 'register' && <RegisterForm onLoginClick={() => handleSwitchForm('login')} />}

      {formType === 'recover' && (
        <RecoverPasswordForm onLoginClick={() => handleSwitchForm('login')} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
