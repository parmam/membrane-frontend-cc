import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { setAuthToken } from './api/client';
import { I18nProvider } from './i18n/I18nProvider';
import store from './store';
import { getCurrentUserThunk } from './store/actions/authActions';
import { setToken } from './store/reducers/authSlice';
import { ThemeProvider } from './theme/ThemeProvider';

// Initial authentication setup when the app loads
const token = localStorage.getItem('authToken');
if (token) {
  store.dispatch(setToken(token));
  setAuthToken(token);
  store.dispatch(getCurrentUserThunk());
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
