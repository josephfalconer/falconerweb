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

	setCurrentRegion = targetIndex => {
		const Application = this,
			{ dispatch } = this.props,
			setRegionData = bindActionCreators(RegionActionCreators.setRegionData, dispatch);

		let regionsClass = "regions",
			transitionClass = this.getTransitionClass(targetIndex),
			timeoutDelay = transitionClass == "js-fade" ? 500 : 1000;

		setRegionData(this.props.currentRegion, 'SET_OUTGOING_REGION');


		Application.setState({...Application.state, isMovingView: true});
		setTimeout(() => { 
			Application.setState({
				...Application.state, 
				isMovingView: false
			}); 
			setRegionData(regionsClass, 'SET_TRANSITION_CLASS');
		}, timeoutDelay);

		setRegionData(`${regionsClass} ${transitionClass}`, 'SET_TRANSITION_CLASS');
		setRegionData(this.props.regions[targetIndex], 'SET_CURRENT_REGION');
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
		const { regions, navigationLinks } = this.props,
			{ isMovingView } = this.state;

		return (
			<div>
				<DataFetcher />

				{navigationLinks &&
					<Navigation 
						setCurrentRegion={this.setCurrentRegion} 
						isMovingView={isMovingView}
					/>
				}

				<DirectionButtons
					setCurrentRegion={this.setCurrentRegion}
					isMovingView={isMovingView} 
				/>

				<section className={this.props.transitionClass}>
					{isMovingView &&
						<Region data={this.props.outgoingRegion} />
					}
					{regions && regions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								path={hash}
								render={() => (<Region data={region} />)} 						
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
        transitionClass: state.regions.transitionClass
    }
);

export default connect(mapStateToProps)(Application);
