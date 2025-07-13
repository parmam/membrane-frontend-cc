import { useAuth } from '@/hooks/useAuth';
import { I18nProvider } from '@/i18n';
import store from '@/store';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import Routes from '@navigation/Routes';
import { ThemeProvider } from '@theme/ThemeProvider';
import '@theme/theme.css';

const AppContent = () => {
  const { token, getCurrentUser } = useAuth();

  // Verificar autenticación al inicio si hay un token en localStorage
  useEffect(() => {
    if (token) {
      getCurrentUser().catch((error) => {
        console.error('Error loading user on app start:', error);
      });
    }
  }, [token, getCurrentUser]);

  return (
    <div className='app'>
      <Routes />
    </div>
  );
};

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
