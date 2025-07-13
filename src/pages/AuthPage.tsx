import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/i18n';

import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '@view/layouts/AuthLayout/AuthLayout';
import LoginForm from '@view/prototypes/Forms/LoginForm/LoginForm';
import RecoverPasswordForm from '@view/prototypes/Forms/RecoverPasswordForm/RecoverPasswordForm';
import RegisterForm from '@view/prototypes/Forms/RegisterForm/RegisterForm';

type AuthFormType = 'login' | 'register' | 'recover';

const AuthPage: FunctionComponent = () => {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formType, setFormType] = useState<AuthFormType>('login');

  // Redirige a home si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

  // Renderizado condicional sin early return para evitar hooks condicionales
  if (isAuthenticated) {
    return null;
  }

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
