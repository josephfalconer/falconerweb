import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as DataActionCreators from '../actions/data';


class DataFetcher extends Component {

	requests = [
		{
			url: '/navigation/',
			type: 'ADD_NAVIGATION_ITEMS'
		},
		{
			url: '/regions/data-regions',
			type: 'ADD_REGIONS'
		},
		{
			url: '/regions/data-content-modules',
			type: 'ADD_CONTENT_MODULES'
		},
		{
			url: '/skills/',
			type: 'ADD_SKILLS'
		},
		{
			url: '/demos/',
			type: 'ADD_DEMOS'
		},
		// {
		// 	url: '/projects/',
		// 	type: 'ADD_PROJECTS'
		// }
	]

	state = {
		successfulRequests: 0
	}

	componentDidMount() {
        const DataFetcher = this,
        	{ dispatch } = this.props,
        	addData = bindActionCreators(DataActionCreators.addData, dispatch);

        for (let request of this.requests) {

        	fetch(request.url)
				.then(response => {
					let successfulRequests = DataFetcher.state.successfulRequests;

					if (response.status == 200) {
						DataFetcher.setState({successfulRequests: successfulRequests + 1});
					}
					return response.json();
				})
				.then(data => {

					let dataFields = [];

					for (let dataItem of data) {

						if (request.type == "ADD_REGIONS") {
							dataItem.fields.pk = dataItem.pk;
						}

						dataFields.push(dataItem.fields);
					}

					addData(dataFields, request.type);
				});
        }

   	}

	render() {
		if (!this.state.successfulRequests == this.requests.length) {
			return(
				<div>	
					Just getting the data from Django...
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = state => (
    { 
    }
);

export default connect(mapStateToProps)(DataFetcher);