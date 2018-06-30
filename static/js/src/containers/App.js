import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route, Redirect } from 'react-router-dom';

import { updateStoreState } from '../actions';
import DirectionButtons from '../components/DirectionButtons';
import Main from '../components/Main';
import Navigation from '../components/Navigation';

class App extends PureComponent {
	componentDidMount() {
		fetch('api/zones/all-zones/')
		.then(response => response.json())
		.then(data => this.props.updateStoreState({
			parentZones: data
		}))
		.catch(error => console.log(error));
	}

	render() {
		const { isMovingZones, zoneTextColour } = this.props;
		let className = '';
		className += isMovingZones ? 'js-moving-regions' : 'js-stationary';
		className += zoneTextColour == 'dark' ? ' js-nav-backgrounds' : '';
		return (
			<div className={className}>
				<header>
					<Navigation />
					<DirectionButtons />
				</header>
				<Main />
			</div>
		);
	}
}

App.propTypes = {
	isMovingZones: PropTypes.bool,
  zoneTextColour: PropTypes.string,
}

function mapStateToProps({isMovingZones, zoneTextColour}, props) {
	return {
		...props,
		isMovingZones,
		zoneTextColour,
	}
}

export default withRouter(connect(mapStateToProps, {
	updateStoreState
})(App));
