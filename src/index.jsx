import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ErrorBoundaries } from './templates/ErrorBoundaries';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundaries />
  </React.StrictMode>,
  document.getElementById('root'),
);
