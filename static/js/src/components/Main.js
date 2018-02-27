import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import IncomingRegion from '../components/IncomingRegion';
import OutgoingRegion from '../components/OutgoingRegion';


function renderChildZones(parentPath, childZones) {
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

const Main = props => {
	const { parentZones, outgoingRegion, isMovingRegions } = props;
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
									isParentZone
									ownChildZones={child_zones}
								/>
							)}
						/>
						{renderChildZones(path_hash, child_zones)}
					</div>
				)
			})}
		</main>
	)
}

Main.propTypes = {
    primaryRegions: PropTypes.array,
    subRegions: PropTypes.array,
    isMovingRegions: PropTypes.bool.isRequired,
    outgoingRegion: PropTypes.object,
    regionTextColour: PropTypes.string.isRequired
}

const mapStateToProps = state => (
    {
        parentZones: state.data.parentZones,
        isMovingRegions: state.transitions.isMovingRegions,
        outgoingRegion: state.transitions.outgoingRegion,
        regionTextColour: state.transitions.currentTextColour,
    }
);

export default withRouter(connect(mapStateToProps)(Main));
