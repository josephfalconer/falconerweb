import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route, Redirect } from 'react-router-dom';

import { addData } from '../actions/data';
import DirectionButtons from '../components/DirectionButtons';
import Main from '../components/Main';
import Navigation from '../components/Navigation';

class App extends PureComponent {
	componentDidMount() {
		fetch('api/zones/all-zones/')
		.then(response => response.json())
		.then(data => this.props.addData(data, 'ADD_ZONES'))
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

const mapStateToProps = state => (
	{
		isMovingZones: state.transitions.isMovingZones,
    zoneTextColour: state.transitions.currentTextColour,
	}
);

export default withRouter(connect(mapStateToProps, {
	addData
})(App));
