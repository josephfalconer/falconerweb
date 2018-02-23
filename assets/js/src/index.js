import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { browserHistory, HashRouter } from 'react-router-dom';

require('../../scss/styles.scss');

import App from './containers/app';
import reducers from './reducers';

const store = createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('application')
);
