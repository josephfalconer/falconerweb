import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';

import IncomingRegion from './IncomingRegion';
import * as actions from '../actions/transitions';


class PrimaryRegion extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	state = {
		subRegions: []
	}

	componentDidMount() {
		const { subRegions, data, dispatch } = this.props,
			updateTransitions = bindActionCreators(actions.updateTransitions, dispatch);

		let currentSubRegions = [],
			y = 0;

		for (let subRegion of subRegions) {
			if (subRegion.parent_region == data.title) {
				y++;
				currentSubRegions.push({ ...subRegion, y: y });				
			}
		}

		this.setState({ subRegions: currentSubRegions });
		updateTransitions(data, 'SET_CURRENT_PRIMARY_REGION');
		updateTransitions(currentSubRegions, 'SET_CURRENT_SUB_REGIONS');
	}

	render() {
		const { data, match } = this.props,
			{ subRegions } = this.state;

		return (
			<div>
				<IncomingRegion data={data} />

				{subRegions.map((subRegion, index) => {
					let hash = `/${subRegion.path_hash}`;
					return (
						<Route 
							key={index}
							// exact
							path={`${match.url}${hash}`}
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
    	subRegions: state.data.subRegions
    }
);

export default connect(mapStateToProps)(PrimaryRegion);