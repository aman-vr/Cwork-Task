import React from 'react';
import ReactDOM from 'react-dom';
import './layout/index.css';
import App from './layout/App';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
