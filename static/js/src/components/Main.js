import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from '../components/IncomingRegion';
// import DirectionButtons from '../components/DirectionButtons';
// import Navigation from '../components/Navigation';
import OutgoingRegion from '../components/OutgoingRegion';


class Regions extends Component {
	static propTypes = {
        primaryRegions: PropTypes.array,
        subRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        outgoingRegion: PropTypes.object,
        regionTextColour: PropTypes.string.isRequired
	}

	renderChildZones = (parentPath, childZones) => {
		if (childZones) {
			return childZones.map(childZone => (
				<Route 
					key={`region-${childZone.path_hash}`}
					path={`/${parentPath}/${childZone.path_hash}/`} 
					render={() => (
						<IncomingRegion 
							pathToParent={parentPath}
							data={childZone} 
						/>
					)} 
				/>
			))
		}
		return null;
	}

	render() {
		const { parentZones, outgoingRegion, isMovingRegions } = this.props;
		if (isMovingRegions) {
			// TODO - replace with ref?
			document.getElementById('regions').scrollTop = 0;
		}
		return (
			<main id="regions" className="regions">	
				{outgoingRegion && isMovingRegions &&
					<OutgoingRegion data={outgoingRegion} />
				}
				{parentZones && parentZones.map(parentZone => {
					const { path_hash, child_zones } = parentZone;
					return (
						<div key={`region-${path_hash}`}>
							<Route
								exact
								path={`/${path_hash}/`} 
								render={() => (
									<IncomingRegion 
										pathToParent={path_hash}
										data={parentZone} 
										ownChildRegions={child_zones}
									/>
								)}
							/>
							{this.renderChildZones(path_hash, child_zones)}
						</div>
					)
				})}
			</main>
		)
	};
}

const mapStateToProps = state => (
    {
        parentZones: state.data.primaryRegions,
        subRegions: state.data.subRegions,
        isMovingRegions: state.transitions.isMovingRegions,
        outgoingRegion: state.transitions.outgoingRegion,
        regionTextColour: state.transitions.currentTextColour,
    }
);

export default withRouter(connect(mapStateToProps)(Regions));
