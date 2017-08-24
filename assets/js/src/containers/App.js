import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import Region from '../components/Region';
import DirectionButtons from '../components/DirectionButtons';

class Application extends Component {

	static propTypes = {
        regions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        isLastChildOutgoing: PropTypes.bool.isRequired,
        outgoing: PropTypes.object,
        regionsContainerClass: PropTypes.string.isRequired
	}

	render() {	
		const { regions, isMovingRegions, isLastChildOutgoing, outgoing, regionsContainerClass, regionsOffsetStyles } = this.props,
			transitionRegion = this.transitionRegion;

		return (
			<div>
				<DataFetcher />

				<Navigation />

				<DirectionButtons />
				
				<section className={regionsContainerClass}>
					{outgoing && isMovingRegions && !isLastChildOutgoing &&
						<Region 
							data={outgoing} 
							isOutgoing="true" 
						/>
					}
					{regions && regions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								exact
								path={hash}
								render={() => (
									<Region data={region}/>
								)} 						
							/>
						);
					})}
					{outgoing && isMovingRegions && isLastChildOutgoing &&
						<Region 
							data={outgoing} 
							isOutgoing="true" 
						/>
					}
				</section>
			</div>
		)
	};
}

const mapStateToProps = state => (
    {
        regions: state.data.regions,
        primaryRegions: state.data.primaryRegions,
        isMovingRegions: state.regions.isMovingRegions,
        isLastChildOutgoing: state.regions.isLastChildOutgoing,
        outgoing: state.regions.outgoing,
        regionsContainerClass: state.regions.regionsContainerClass,
        regionsClass: state.regions.regionsClass
    }
);

export default connect(mapStateToProps)(Application);
