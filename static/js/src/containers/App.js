import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { addPagesData, updateStoreState } from '../actions';
import DirectionButtons from '../components/DirectionButtons';
import Main from '../components/Main';
import Navigation from '../components/Navigation';

class App extends PureComponent {
	componentDidMount() {
		fetch('api/pages/')
		.then(response => response.json())
		.then(parentPages => this.props.addPagesData(parentPages));
		fetch('api/navigation/')
		.then(response => response.json())
		.then(navigationLinks => this.props.updateStoreState({navigationLinks}));
	}

	render() {
		const { isMovingPages, pageTextColour } = this.props;
		let className = '';
		className += isMovingPages ? 'js-moving-regions' : 'js-stationary';
		className += pageTextColour == 'dark' ? ' js-nav-backgrounds' : '';
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
	isMovingPages: PropTypes.bool,
  pageTextColour: PropTypes.string,
}

function mapStateToProps({isMovingPages, pageTextColour}, props) {
	return {
		...props,
		isMovingPages,
		pageTextColour,
	}
}

export default withRouter(connect(mapStateToProps, {
	addPagesData,
	updateStoreState
})(App));
