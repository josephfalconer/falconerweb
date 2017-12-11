import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import PrimaryRegion from '../components/PrimaryRegion';
import OutgoingRegion from '../components/OutgoingRegion';
import DirectionButtons from '../components/DirectionButtons';

class Application extends Component {

	static propTypes = {
        primaryRegions: PropTypes.array,
        subRegions: PropTypes.array,
        isMovingRegions: PropTypes.bool.isRequired,
        outgoingRegion: PropTypes.object,
        regionTextColour: PropTypes.string.isRequired
	}

	render() {	
		const { 
			primaryRegions, 
			outgoingRegion, 
			isMovingRegions, 
			regionTextColour } = this.props;

		// TODO
		const style = { position: 'absolute', zIndex: '200'}

		let className = '';
		className += isMovingRegions ? 'js-moving-regions' : 'js-stationary';
		className += regionTextColour == 'dark' ? ' js-nav-backgrounds' : '';

		if (isMovingRegions)
			document.getElementById('regions').scrollTop = 0;

		return (
			<div className={className}>
				<DataFetcher />

				<Navigation />

				<DirectionButtons />

				<Redirect to={`${this.props.match.url}start`} />
				
				<main id="regions" className="regions">
					{outgoingRegion && isMovingRegions &&
						<OutgoingRegion data={outgoingRegion} />
					}

					{primaryRegions && primaryRegions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								path={hash}
								render={props => (
									<PrimaryRegion 
										data={region}
										match={props.match}
									/>
								)} 						
							/>
						);
					})}

				</main>
			</div>
		)
	};
}

const mapStateToProps = state => (
    {
        primaryRegions: state.data.primaryRegions,
        subRegions: state.data.subRegions,
        isMovingRegions: state.transitions.isMovingRegions,
        outgoingRegion: state.transitions.outgoingRegion,
        regionTextColour: state.transitions.currentTextColour,
    }
);

export default connect(mapStateToProps)(Application);
