import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

require('../../scss/styles.scss');

import Application from './containers/App';


const requestURLS = [
	'/skills/',
	'/demos/',
]

let successfulRequests = 0;

for (let url of requestURLS) {
	fetch(url).then(response => {

		if (response.status == 200) {
			console.log(response.json());
			successfulRequests++;
		}
		
		if (successfulRequests == requestURLS.length) {
			console.log("All requests were received successfully!");
		}

	});
}
