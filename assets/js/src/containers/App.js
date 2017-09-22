import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

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
	}

	render() {	
		const { primaryRegions, outgoingRegion, isMovingRegions} = this.props;

		// TODO
		const style = { position: 'absolute'}

		return (
			<div>
				<DataFetcher />

				<Navigation />

				<DirectionButtons />

				<div style={style}>
					HELLO! Welcome.
				</div>
				
				<main className="regions">
					{outgoingRegion && isMovingRegions &&
						<OutgoingRegion data={outgoingRegion} />
					}

					{primaryRegions && primaryRegions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						console.log(hash);
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
        regionsClass: state.transitions.regionsClass
    }
);

export default connect(mapStateToProps)(Application);
