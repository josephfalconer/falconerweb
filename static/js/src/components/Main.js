import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import IncomingZone from '../components/IncomingZone';
import OutgoingZone from '../components/OutgoingZone';


function renderChildZones(parentPath, childZones) {
	if (childZones) {
		return childZones.map(childZone => (
			<Route
				key={`zone-${childZone.path_hash}`}
				path={`/${parentPath}/${childZone.path_hash}/`}
				render={() => (
					<IncomingZone
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
	const { parentZones, outgoingZone, isMovingZones, location } = props;
	if (isMovingZones) {
		// TODO - replace with ref?
		document.getElementById('regions').scrollTop = 0;
	}
	return (
		<main id="regions" className="regions">
			{outgoingZone && isMovingZones &&
				<OutgoingZone data={outgoingZone} />
			}
			{parentZones && parentZones.map(parentZone => {
				const { path_hash, child_zones } = parentZone;
				return (
					<div key={`zone-${path_hash}`}>
						<Route
							exact
							path={`/${path_hash}/`}
							render={() => (
								<IncomingZone
									pathToParent={path_hash}
									data={parentZone}
									isParentZone
									ownChildZones={child_zones}
									location={location}
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
    primaryZones: PropTypes.array,
    isMovingZones: PropTypes.bool.isRequired,
    outgoingZone: PropTypes.object,
}

function mapStateToProps({
	parentZones, 
	isMovingZones, 
	outgoingZone
}, props) {
	return {
		...props,
		parentZones,
		isMovingZones,
		outgoingZone,
	}
}

export default withRouter(connect(mapStateToProps)(Main));
