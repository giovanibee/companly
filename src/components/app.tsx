import { BrowserRouter, Route, Routes } from 'react-router-dom';

import React from 'react';
import DelayRender from './delay-render';

const Home = React.lazy(() => import('./home'));
const NoMatch = React.lazy(() => import('./no-match'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DelayRender><Home /></DelayRender>} />
        <Route path="*" element={<DelayRender><NoMatch /></DelayRender>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
