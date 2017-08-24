import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Region from './Region';
import * as RegionActionCreators from '../actions/transitions';


class PrimaryRegion extends Component {

	static propTypes = {
		childRegions: PropTypes.array
	}

	state = {
		childRegionsData: []
	}

	componentDidMount() {
		const { data, childRegions, dispatch } = this.props;

		const setRegionsData = bindActionCreators(RegionActionCreators.setRegionsData, dispatch);

		let childRegionsData = [];

		for (let childRegion of childRegions) {
			if (childRegion.parent_region == data.pk) {
				childRegionsData.push(childRegion);
			}
		}

		this.setState({ childRegionsData: childRegionsData });
		setRegionsData(childRegionsData, 'SET_CURRENT_CHILD_REGIONS');
   	}

	render() {
		const { data } = this.props;
		const { childRegionsData } = this.state;

		return(
			<section className="primaryregion">
				<Region data={data} />

				{childRegionsData && childRegionsData.map((childRegion, index) => {
					let hash = `/${childRegion.path_hash}`;
					console.log(childRegion)
					return (
						<Route 
							key={index}
							// exact
							path={hash}
							render={() => (
								<Region data={childRegion}/>
							)} 						
						/>
					)
				})}
			</section>
			
		);
	}
}

const mapStateToProps = state => (
    { 
    	childRegions: state.data.childRegions,
    	childRegionsData: state.data.childRegionsData,
    }
);

export default connect(mapStateToProps)(PrimaryRegion);