import { useI18n } from '@/i18n';

import { FunctionComponent, useState } from 'react';

import AuthLayout from '@view/layouts/AuthLayout/AuthLayout';
import LoginForm from '@view/prototypes/Forms/LoginForm/LoginForm';
import RecoverPasswordForm from '@view/prototypes/Forms/RecoverPasswordForm/RecoverPasswordForm';
import RegisterForm from '@view/prototypes/Forms/RegisterForm/RegisterForm';

type AuthFormType = 'login' | 'register' | 'recover';

const AuthPage: FunctionComponent = () => {
  const { t } = useI18n();
  const [formType, setFormType] = useState<AuthFormType>('login');

  const handleSwitchForm = (type: AuthFormType) => {
    setFormType(type);
  };

  const getPageTitle = () => {
    switch (formType) {
      case 'login':
        return t('auth.login');
      case 'register':
        return t('auth.createAccount');
      case 'recover':
        return t('auth.recoverPassword');
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
