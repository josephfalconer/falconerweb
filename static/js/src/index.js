import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { browserHistory, BrowserRouter } from 'react-router-dom';

require('../../scss/styles.scss');

import App from './containers/app';
import reducer from './reducer';

const store = createStore(
  reducer,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
