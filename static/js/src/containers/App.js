import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route, Redirect } from 'react-router-dom';

import DataFetcher from '../components/DataFetcher';
import DirectionButtons from '../components/DirectionButtons';
import Main from '../components/Main';
import Navigation from '../components/Navigation';


const App = props => {
	const { isMovingZones, zoneTextColour } = props;
	let className = '';
	className += isMovingZones ? 'js-moving-regions' : 'js-stationary';
	className += zoneTextColour == 'dark' ? ' js-nav-backgrounds' : '';

	return (
		<div className={className}>
			<DataFetcher />
			<header>
				<Navigation />
				<DirectionButtons />
			</header>
			<Main />
		</div>
	)
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

export default withRouter(connect(mapStateToProps)(App));
