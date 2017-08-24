import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import Region from '../components/Region';
import PrimaryRegion from '../components/PrimaryRegion';
import DirectionButtons from '../components/DirectionButtons';

class Application extends Component {

	static propTypes = {
        primaryRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        isLastChildOutgoing: PropTypes.bool.isRequired,
        outgoing: PropTypes.object,
        regionsContainerClass: PropTypes.string.isRequired
	}

	render() {	
		const { primaryRegions, isMovingRegions, isLastChildOutgoing, outgoing, regionsContainerClass, regionsOffsetStyles } = this.props,
			transitionRegion = this.transitionRegion;

		return (
			<div>
				<DataFetcher />

				<Navigation />

				<DirectionButtons />
				
				<main className={regionsContainerClass}>
					{outgoing && isMovingRegions && !isLastChildOutgoing &&
						<Region 
							data={outgoing} 
							isOutgoing="true" 
						/>
					}
					{primaryRegions && primaryRegions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								exact
								path={hash}
								render={() => (
									<PrimaryRegion data={region}/>
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
				</main>
			</div>
		)
	};
}

const mapStateToProps = state => (
    {
        primaryRegions: state.data.primaryRegions,
        isMovingRegions: state.transitions.isMovingRegions,
        isLastChildOutgoing: state.transitions.isLastChildOutgoing,
        outgoing: state.transitions.outgoing,
        regionsContainerClass: state.transitions.regionsContainerClass,
        regionsClass: state.transitions.regionsClass
    }
);

export default connect(mapStateToProps)(Application);
