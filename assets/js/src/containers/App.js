import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import PrimaryRegion from '../components/PrimaryRegion';
import OutgoingRegion from '../components/OutgoingRegion';
import SidewaysButtons from '../components/SidewaysButtons';

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

		console.log(regionTextColour);

		className += isMovingRegions ? 'js-moving-regions' : 'js-stationary';
		className += regionTextColour == 'dark' ? ' js-nav-backgrounds' : '';

		return (
			<div className={className}>
				<DataFetcher />

				<Navigation />

				<SidewaysButtons />

				<div style={style}>
					HELLO! Welcome.
					<Link to="start">Start</Link>
				</div>
				
				<main className="regions">
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
