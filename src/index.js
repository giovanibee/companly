import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient, QueryClientProvider
} from 'react-query';
import App from './pages/app';

const root = createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
)
