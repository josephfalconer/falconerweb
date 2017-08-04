import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route} from 'react-router-dom';

require('../../scss/styles.scss');

import reducers from './reducers';
import Application from './containers/App';


const store = createStore(
	reducers,
	window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route path="/" component={Application} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('application')
);
