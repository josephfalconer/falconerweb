import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import Region from '../components/Region';
import DirectionButtons from '../components/DirectionButtons';

class Application extends Component {

	static propTypes = {
        primaryRegions: PropTypes.array,
        subRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        isLastChildOutgoing: PropTypes.bool.isRequired,
        outgoing: PropTypes.object,
        regionsContainerClass: PropTypes.string.isRequired
	}

	getCurrentSubRegions = (currentRegion, subRegions) => {
		let currentSubRegions = [],
			y = 0;
		
		for (let subRegion of subRegions) {
			if (subRegion.parent_region == currentRegion.pk) {
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

	currentSubRegions = [];

	isSetSubRegions = false;

	render() {	
		const { 
			primaryRegions, 
			currentRegion,
			subRegions,
			isMovingRegions, 
			isLastChildOutgoing, 
			outgoingRegion, 
			regionsContainerClass,
		} = this.props;


		// TODO: temporary hack until I properly understand nested routes
		// if no current region
		if (subRegions && !currentRegion) {

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
					if (primaryRegion.pk == currentSubRegion.parent_region) {
						currentPrimaryRegion = primaryRegion;
						this.currentSubRegions = this.getCurrentSubRegions(currentPrimaryRegion, subRegions);
						this.isSetSubRegions = true;
					}
				}
			}
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
				
				<main className={regionsContainerClass}>
					{outgoingRegion && isMovingRegions && !isLastChildOutgoing &&
						<Region 
							data={outgoingRegion} 
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
									<Region data={region}/>
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
									<Region data={region}/>
								)} 						
							/>
						);
					})}

					{outgoingRegion && isMovingRegions && isLastChildOutgoing &&
						<Region 
							data={outgoingRegion} 
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
        subRegions: state.data.subRegions,
        currentRegion: state.transitions.currentRegion,
        isMovingRegions: state.transitions.isMovingRegions,
        isLastChildOutgoing: state.transitions.isLastChildOutgoing,
        outgoingRegion: state.transitions.outgoingRegion,
        regionsContainerClass: state.transitions.regionsContainerClass,
        regionsClass: state.transitions.regionsClass
    }
);

export default connect(mapStateToProps)(Application);
