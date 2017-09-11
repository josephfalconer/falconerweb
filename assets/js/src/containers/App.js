import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import IncomingRegion from '../components/IncomingRegion';
import OutgoingRegion from '../components/OutgoingRegion';
import DirectionButtons from '../components/DirectionButtons';

class Application extends Component {

	static propTypes = {
        primaryRegions: PropTypes.array,
        subRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        outgoingRegion: PropTypes.object,
	}

	getCurrentSubRegions = (currentRegion, subRegions) => {
		let currentSubRegions = [],
			y = 0;
		
		for (let subRegion of subRegions) {
			if (subRegion.parent_region == currentRegion.title) {
				y++;
				currentSubRegions.push({
					...subRegion,
					x: currentRegion.x,
					y: y
				});				
			}
		}
		return currentSubRegions;
	}

	getCurrentSubRegionsFromLocation = (primaryRegions, subRegions) => {
		let currentHash = window.location.hash,
			currentPrimaryRegion,
			currentSubRegion;

		currentHash = currentHash.slice(2, currentHash.length);

		for (let subRegion of subRegions) {

			if (subRegion.path_hash == currentHash) {
				currentSubRegion = subRegion;
			}
		}

		if (currentSubRegion) {
			for (let primaryRegion of primaryRegions) {
				if (primaryRegion.title == currentSubRegion.parent_region) {
					currentPrimaryRegion = primaryRegion;
					this.currentSubRegions = this.getCurrentSubRegions(currentPrimaryRegion, subRegions);
					this.isSetSubRegions = true;
				}
			}
		}
	}

	currentSubRegions = [];

	isSetSubRegions = false;

	render() {	
		const { primaryRegions, currentRegion, subRegions, outgoingRegion, } = this.props;

		// TODO: temporary hack until I properly understand nested routes
		// if no current region
		if (subRegions && !currentRegion) {
			this.getCurrentSubRegionsFromLocation(primaryRegions, subRegions);
		}

		// set current page regions when page first loads
		if (currentRegion && subRegions.length && !this.isSetSubRegions) {
			this.currentSubRegions = this.getCurrentSubRegions(currentRegion, subRegions);
			this.isSetSubRegions = true;
		}

		// update current subregions on primary region transitions
		if (currentRegion && outgoingRegion) {
			if (currentRegion.x != outgoingRegion.x) {
				this.currentSubRegions = this.getCurrentSubRegions(currentRegion, subRegions);
			}
		} 

		return (
			<div>
				<DataFetcher />

				<Navigation />

				<DirectionButtons currentSubRegions={this.currentSubRegions} />
				
				<main className="regions">
					{outgoingRegion && isMovingRegions &&
						<OutgoingRegion data={outgoingRegion} />
					}

					{primaryRegions && primaryRegions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								exact
								path={hash}
								render={() => (
									<IncomingRegion data={region}/>
								)} 						
							/>
						);
					})}

					{this.currentSubRegions && this.currentSubRegions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								exact
								path={hash}
								render={() => (
									<IncomingRegion data={region} />
								)} 						
							/>
						);
					})}

				</main>
			</div>
		)
	};
}

const mapStateToProps = state => (
    {
        primaryRegions: state.data.primaryRegions,
        subRegions: state.data.subRegions,
        currentRegion: state.transitions.currentRegion,
        isMovingRegions: state.transitions.isMovingRegions,
        outgoingRegion: state.transitions.outgoingRegion,
        regionsClass: state.transitions.regionsClass
    }
);

export default connect(mapStateToProps)(Application);
