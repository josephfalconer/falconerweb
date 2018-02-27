import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route, Redirect } from 'react-router-dom';

import DataFetcher from '../components/DataFetcher';
import DirectionButtons from '../components/DirectionButtons';
import Regions from '../components/Main';
import Navigation from '../components/Navigation';


const App = props => {
	const { isMovingRegions, regionTextColour } = props;
	let className = '';
	className += isMovingRegions ? 'js-moving-regions' : 'js-stationary';
	className += regionTextColour == 'dark' ? ' js-nav-backgrounds' : '';

	return (
		<div className={className}>
			<DataFetcher />
			<header>
				<Navigation />
				<DirectionButtons />
			</header>
			<Regions />
		</div>
	)
}

App.propTypes = {
	isMovingRegions: PropTypes.bool,
    regionTextColour: PropTypes.string,
}

const mapStateToProps = state => (
	{
		isMovingRegions: state.transitions.isMovingRegions,
        regionTextColour: state.transitions.currentTextColour,
	}
);

export default withRouter(connect(mapStateToProps)(App));
