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
        isAfterOutgoing: PropTypes.bool.isRequired,
        outgoingRegion: PropTypes.object,
        regionsContainerClass: PropTypes.string.isRequired,
        regionsStyleOffsets: PropTypes.object.isRequired,
	}

	render() {	
		const { regions, isMovingRegions, isAfterOutgoing, outgoingRegion, regionsContainerClass, regionsStyleOffsets } = this.props,
			transitionRegion = this.transitionRegion;

		return (
			<div>
				<DataFetcher />

				<Navigation />

				<DirectionButtons />
				
				<section className={regionsContainerClass} style={regionsStyleOffsets}>
					{outgoingRegion && isMovingRegions && !isAfterOutgoing &&
						<Region 
							data={outgoingRegion} 
							isOutgoingRegion="true" 
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
					{outgoingRegion && isMovingRegions && isAfterOutgoing &&
						<Region 
							data={outgoingRegion} 
							isOutgoingRegion="true" 
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
        isMovingRegions: state.regions.isMovingRegions,
        isAfterOutgoing: state.regions.isAfterOutgoing,
        outgoingRegion: state.regions.outgoingRegion,
        regionsContainerClass: state.regions.regionsContainerClass,
        regionsClass: state.regions.regionsClass,
        regionsStyleOffsets: state.regions.regionsStyleOffsets
    }
);

export default connect(mapStateToProps)(Application);
