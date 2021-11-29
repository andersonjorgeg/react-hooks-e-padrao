import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CompoundComponentsContext } from './templates/CompoundComponentsContext';

ReactDOM.render(
  <React.StrictMode>
    <CompoundComponentsContext />
  </React.StrictMode>,
  document.getElementById('root'),
);
