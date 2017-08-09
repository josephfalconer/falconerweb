import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Navigation from '../components/Navigation';
import Region from '../components/Region';
import DirectionButtons from '../components/DirectionButtons';
import * as RegionActionCreators from '../actions/regions';

class Application extends Component {

	state = {
		isMovingView: false
	}

	componentDidMount() {
		const { dispatch } = this.props;
		this.setRegionData = bindActionCreators(RegionActionCreators.setRegionData, dispatch);
	}

	transitionRegion = targetIndex => {
		const App = this,
			{ currentRegion } = App.props;

		if (!currentRegion) {
			return;
		}

		let regionsClass = "regions",
			transitionClass = this.getTransitionClass(targetIndex),
			timeoutDelay = transitionClass == "js-fade" ? 500 : 1000;

		App.setRegionData(currentRegion, 'SET_OUTGOING_REGION');

		App.setState({...App.state, isMovingView: true});
		setTimeout(() => { 
			App.setState({
				...App.state, 
				isMovingView: false
			}); 
			App.setRegionData(regionsClass, 'SET_TRANSITION_CLASS');
		}, timeoutDelay);

		App.setRegionData(`${regionsClass} ${transitionClass}`, 'SET_TRANSITION_CLASS');
	}

	getTransitionClass = targetIndex => {
		const currentX = this.props.currentRegion.x,
			currentY = this.props.currentRegion.y,
			targetX = this.props.regions[targetIndex].x,
			targetY = this.props.regions[targetIndex].y;

		let transitionClass = "js-move ";

		if ( currentX == targetX && Math.abs(currentY - targetY) == 1 ) {
			transitionClass += targetY > currentY ? "js-column js-move-up" : "js-column-reverse js-move-down";

		} else if (currentY == targetY && Math.abs(currentX - targetX) == 1 ) {
			transitionClass += targetX > currentX ? "js-move-left" : "js-row-reverse js-move-right";

		} else {
			transitionClass = "js-fade";
		}
		return transitionClass;
	}

	render() {	
		const { regions, regionsClass, currentRegion, outgoingRegion, navigationLinks } = this.props,
			{ isMovingView } = this.state,
			transitionRegion = this.transitionRegion;

		const App = this;

		return (
			<div>
				<DataFetcher />

				{navigationLinks &&
					<Navigation 
						transitionRegion={transitionRegion} 
						isMovingView={isMovingView}
					/>
				}

				{currentRegion &&
					<DirectionButtons
						transitionRegion={transitionRegion}
						isMovingView={isMovingView} 
					/>
				}
				
				<section className={regionsClass}>
					{isMovingView &&
						<Region data={outgoingRegion} />
					}
					{regions && regions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								exact
								path={hash}
								render={() => (
									<Region 
										data={region} 
										transitionRegion={App.transitionRegion} 
									/>
								)} 						
							/>
						);
					})}
				</section>
			</div>
		)
	};
}


const mapStateToProps = state => (
    {
    	navigationLinks: state.data.navigationLinks,
        regions: state.data.regions,
        setRegionData: state.regions.setRegionData,
        outgoingRegion: state.regions.outgoingRegion,
        currentRegion: state.regions.currentRegion,
        regionsClass: state.regions.regionsClass
    }
);

export default connect(mapStateToProps)(Application);
