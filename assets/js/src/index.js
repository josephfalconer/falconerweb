import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';

require('../../scss/styles.scss');

import Application from './containers/App';


const requests = [
	{
		url: '/skills/',
		sortTo: 'skills'
	},
	{
		url: '/demos/',
		sortTo: 'demos'
	},
	// '/projects/',
]

let successfulRequests = 0,
	rendered = false,
	sortedData = {};


for (let request of requests) {

	fetch(request.url)
		.then(response => {
			if (response.status == 200) {
				successfulRequests++;
				return response.json();
			}
		})
		.then(function(data) {

			let fields = [];

			for (let dataObject of data) {
				fields.push(dataObject.fields);
			}

			sortedData[request.sortTo] = fields;
			console.log(sortedData);

			if (successfulRequests == requests.length && !rendered) {
				console.log("All requests were received successfully!");
				
				ReactDOM.render(<Application/>, document.getElementById('application'));
				rendered = true;
			}
		});

}
