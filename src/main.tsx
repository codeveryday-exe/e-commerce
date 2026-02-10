import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { App } from './App.tsx';
import { CartPanelContextProvider } from './contexts/CartPanelContext.tsx';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartPanelContextProvider>
        <App />
      </CartPanelContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
