import symbol from "core-js/es6/symbol";
require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';

require('../../scss/styles.scss');

import Application from './containers/App';


const requests = [
	{
		url: '/pages/',
		sortTo: 'pages'
	},
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

const renderApplication = data => {
	ReactDOM.render(
		<Application
			pages={data.pages}
			skills={data.skills}
			demos={data.demos}
		/>, document.getElementById('application'));
}

let sortedData = {},
	rendered = false;


for (let request of requests) {

	fetch(request.url)
		.then(response => {

			if (response.status == 200) {
				return response.json();
			}

		})
		.then(data => {

			let fields = [];

			for (let dataObject of data) {
				fields.push(dataObject.fields);
			}

			sortedData[request.sortTo] = fields;
			console.log(sortedData);

		})
		.then(() => {

			if (sortedData[requests[requests.length - 1].sortTo] && !rendered) {
				console.log("All requests were received successfully!");
				renderApplication(sortedData);
				rendered = true;				
			}
		});

}
