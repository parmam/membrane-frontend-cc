import { I18nProvider } from '@/i18n';
import store from '@/store';

import { Provider } from 'react-redux';

import Routes from '@navigation/Routes';
import { ThemeProvider } from '@theme/ThemeProvider';
import '@theme/theme.css';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <Provider store={store}>
          <div className='app'>
            <Routes />
          </div>
        </Provider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
