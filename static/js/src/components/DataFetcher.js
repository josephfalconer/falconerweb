import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addData } from '../actions/data';


const REQUESTS = [
	// {
	// 	url: 'api/navigation/',
	// 	type: 'ADD_NAVIGATION_ITEMS'
	// },
	{
		url: 'api/zones/all-zones',
		type: 'ADD_PRIMARY_REGIONS'
	},
	// {
	// 	url: 'api/zones/content-modules',
	// 	type: 'ADD_CONTENT_MODULES'
	// },
	// {
	// 	url: 'api/toolkit/',
	// 	type: 'ADD_SKILLS'
	// },
	// {
	// 	url: 'api/demos/',
	// 	type: 'ADD_DEMOS'
	// }
]

class DataFetcher extends Component {
	componentDidMount() {
        const { addData } = this.props;
        REQUESTS.forEach(request => {
        	fetch(request.url)
	        	.then(response => response.json())
				.then(data => addData(data, request.type))
				.catch(error => console.log(error));
		});
   	}

	render() {
		return null;
	}
}

export default connect(null, {
	addData
})(DataFetcher);