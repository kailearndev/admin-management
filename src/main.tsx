import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { LoadingProvider } from './components/LoadingContext.tsx';
import ThemeProvider from './contexts/ThemeProvider.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <LoadingProvider>
        <App />
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>

);
