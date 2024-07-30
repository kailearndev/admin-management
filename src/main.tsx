import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ThemeProvider from './contexts/ThemeProvider.tsx';
import { LoadingProvider } from './components/LoadingContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <LoadingProvider>
        <App />
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
