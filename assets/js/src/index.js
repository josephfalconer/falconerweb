import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

require('../../scss/styles.scss');

import Application from './containers/App';


fetch('/skills/').then(response => {
	console.log(response.json());
});