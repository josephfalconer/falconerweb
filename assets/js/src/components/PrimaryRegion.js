import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import IncomingRegion from './IncomingRegion';
import * as actions from '../actions/transitions';


class PrimaryRegion extends Component {

	constructor(props) {
		super(props);
		this.buttons = [];
		this.subRegions = [];
		this.isSetSubRegions = false;
		this.updateData = bindActionCreators(actions.updateTransitions, props.dispatch);
	}

	static propTypes = {
		data: PropTypes.object.isRequired,
		subRegions: PropTypes.array,
		match: PropTypes.object.isRequired,
	}

	componentDidMount() {
		// tell Redux about current Router match
		this.updateData(this.props.match.url, 'UPDATE_CURRENT_MATCH');

		// allow time for API data to reach Redux store
		setTimeout(() => {
			this.setSubRegions();
		}, 100);
	}

	setSubRegions = () => {
		this.subRegions = this.getSubRegions();
		// tell redux about current subregions
		this.updateData(this.subRegions, 'SET_CURRENT_SUB_REGIONS');
	}

	getSubRegions = () => {
		const { subRegions, data } = this.props;
		let currentSubRegions = [],
			y = 0;

		if (!subRegions.length) return [];
		
		for (let subRegion of subRegions) {
			if (subRegion.parent_region === data.path_hash) {
				y++;
				currentSubRegions.push({ 
					...subRegion, 
					x: data.x,
					y: y 
				});				
			}
		}

		return currentSubRegions;
	}

	render() {
		const { data, match } = this.props;
		
		return (
			<div>
				<Route 
					path={match.url}
					exact
					render={props => (
						<IncomingRegion data={data} />
					)}
				/>

				{this.subRegions.map((subRegion, index) => {
					return (
						<Route 
							key={index}
							path={`${match.url}/${subRegion.path_hash}`}
							render={props => (
								<IncomingRegion data={subRegion} match={props.match}/>
							)} 						
						/>
					)
				})}
			</div>
		)
	}
}


const mapStateToProps = state => (
    {
    	subRegions: state.data.subRegions,
    }
);

export default connect(mapStateToProps)(PrimaryRegion);
