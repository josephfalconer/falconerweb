import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route, Redirect } from 'react-router-dom';

import IncomingRegion from '../components/IncomingRegion';
import DataFetcher from '../components/DataFetcher';
import DirectionButtons from '../components/DirectionButtons';
import Regions from '../components/Main';
import Navigation from '../components/Navigation';
import OutgoingRegion from '../components/OutgoingRegion';


class Application extends Component {

	static propTypes = {
        primaryRegions: PropTypes.array,
        subRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        outgoingRegion: PropTypes.object,
        regionTextColour: PropTypes.string.isRequired
	}

	getSubRegions = primaryRegion => {
		const { subRegions } = this.props;
		let ownSubRegions = [];
		let y = 0;
		// TODO - this will be refactored when backend data structure is fixed
		if (subRegions.length) {
			subRegions.forEach(subRegion => {
				if (subRegion.parent_region === primaryRegion.path_hash) {
					y++;
					ownSubRegions.push({
						...subRegion,
						x: primaryRegion.x,
						y: y
					});
				}
			});
			console.log(ownSubRegions);
			return ownSubRegions;
		}
		// return [];
	}

	renderSubRegions = (subRegions, match) => {
		if (subRegions.length) {
			return subRegions.map(subRegion => (
				<Route
					key={`path-${subRegion.path_hash}`}
					path={`${match.url}/${subRegion.path_hash}`}
					render={() => (
						<IncomingRegion data={subRegion} match={match}/>
					)}
				/>
			));
		}
		return null;
	}

	render() {
		const {
			primaryRegions,
			outgoingRegion,
			isMovingRegions,
			regionTextColour,
			match
		} = this.props;

		let className = '';
		className += isMovingRegions ? 'js-moving-regions' : 'js-stationary';
		className += regionTextColour == 'dark' ? ' js-nav-backgrounds' : '';

		if (isMovingRegions) {
			document.getElementById('regions').scrollTop = 0;
		}

		return (
			<div className={className}>
				<DataFetcher />
				<Navigation />
				<DirectionButtons />

				<main id="regions" className="regions">
					{outgoingRegion && isMovingRegions &&
						<OutgoingRegion data={outgoingRegion} />
					}

					{primaryRegions && primaryRegions.map((region, index) => {
						const subRegions = this.getSubRegions(region);
						let hash = `/${region.path_hash}`;
						return (
							<Route
								key={index}
								path={hash}
								render={() => (
									<IncomingRegion data={region} />
								)}
							>
								{this.renderSubRegions(subRegions, match)}
							</Route>
						);
					})}
				</main>
			</div>
		)
	};
}

// const mapStateToProps = state => (
//     {
//         primaryRegions: state.data.primaryRegions,
//         subRegions: state.data.subRegions,
//         isMovingRegions: state.transitions.isMovingRegions,
//         outgoingRegion: state.transitions.outgoingRegion,
//         regionTextColour: state.transitions.currentTextColour,
//     }
// );

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
