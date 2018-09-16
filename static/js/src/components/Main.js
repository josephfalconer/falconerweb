import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { updateStoreState } from '../actions';
import IncomingZone from './IncomingZone';
import OutgoingZone from './OutgoingZone';

class Main extends PureComponent {
	constructor(props) {
		super(props)
		this.setContainerRef = element => this.containerElement = element;
	}

	componentDidMount() {
		this.props.updateStoreState({containerElement: this.containerElement});
	}

	render() {
		const { parentZones, outgoingZone, isMovingZones, location } = this.props;
		const className = isMovingZones ? 'regions js-hide-overflow' : 'regions';
		return (
			<main tabIndex="0" ref={this.setContainerRef} className={className}>
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
							{child_zones && child_zones.map(childZone => (
								<Route
									key={`zone-${childZone.path_hash}`}
									path={`/${path_hash}/${childZone.path_hash}/`}
									render={() => (
										<IncomingZone
											pathToParent={path_hash}
											data={childZone}
										/>
									)}
								/>
							))}
						</div>
					)
				})}
			</main>
		);		
	}
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

export default withRouter(connect(mapStateToProps, {
	updateStoreState
})(Main));
