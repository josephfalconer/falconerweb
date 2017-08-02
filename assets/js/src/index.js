import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter, Route} from 'react-router-dom';

require('../../scss/styles.scss');

import DataReducer from './reducers/reducer_data.js';
import Application from './containers/App';


const store = createStore(
	DataReducer,
	window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Route path="/" component={Application} />
		</HashRouter>
	</Provider>,
	document.getElementById('application')
);
