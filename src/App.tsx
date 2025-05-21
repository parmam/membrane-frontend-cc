import { I18nProvider } from '@/i18n';

import Routes from '@navigation/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@theme/ThemeProvider';
import '@theme/theme.css';

const queryClient = new QueryClient();

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <div className='app'>
            <Routes />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
