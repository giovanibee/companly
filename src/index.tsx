import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './components/app';

// eslint-disable-next-line react/no-render-return-value
const render = (Component: any) => ReactDOM.render(<Component />, document.getElementById('root'));

render(hot(App));
