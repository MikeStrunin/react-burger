import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app/app'
import './index.css'
import { store } from './services/store';

const root = createRoot(document.querySelector('#root')!);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
)