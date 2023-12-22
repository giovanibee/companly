import React from 'react';
import { render } from 'react-dom';
import {
  QueryClient, QueryClientProvider
} from 'react-query';
import App from './pages/app';

render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
, document.getElementById('root'));
