import Routes from '@navigation/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@theme/ThemeProvider';
import '@theme/theme.css';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className='app'>
          <Routes />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
