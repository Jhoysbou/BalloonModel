import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ModelContextProvider } from './context/ModelContext';

ReactDOM.render(
  <React.StrictMode>
    <ModelContextProvider>
      <App />
    </ModelContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
