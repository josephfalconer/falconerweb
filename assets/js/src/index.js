import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

require('../../scss/styles.scss');

import DataReducer from './reducers/reducer_data.js';
import Application from './containers/App';


const store = createStore(
	DataReducer,
	window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
	<Provider store={store}>
		<Application />
	</Provider>,
	document.getElementById('application')
);
