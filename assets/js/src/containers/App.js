import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Route } from 'react-router-dom';
import TransitionGroup from "react-transition-group/TransitionGroup";


import DataFetcher from './DataFetcher';
import Region from '../components/Region';
import * as RegionActionCreators from '../actions/regions';

class Application extends Component {

	state = {
		isMovingView: false
	}

	updateCurrentRegion = index => {

		const Application = this,
			{ dispatch } = this.props,
			updateRegionData = bindActionCreators(RegionActionCreators.updateRegionData, dispatch);

		const currentX = this.props.currentRegion.x,
			currentY = this.props.currentRegion.y,
			targetX = this.props.regions[index].x,
			targetY = this.props.regions[index].y;

		let regionsClass = "regions",
			transitionClass;

		if (currentX == targetX) {
			transitionClass = targetY > currentY ? "js-move-up" : "js-move-down";
			transitionClass = `js-column ${transitionClass}`;
			console.log(targetY > currentY ? "Move down" : "Move up");

		} else if (currentY == targetY) {
			transitionClass = targetX > currentX ? "js-move-left" : "js-move-right";

		} else {
			console.log("View is moving diagonal - fade transition");
		}

		Application.setState({...Application.state, isMovingView: true});
		setTimeout(() => { 
			Application.setState({
				...Application.state, 
				isMovingView: false
			}); 
			updateRegionData(regionsClass, 'SET_TRANSITION_CLASS');
		}, 5000);

		updateRegionData(`${regionsClass} ${transitionClass}`, 'SET_TRANSITION_CLASS');
		updateRegionData(this.props.regions[index], 'SET_CURRENT_REGION');
	}

	render() {	
		const { regions, navigationLinks } = this.props;

		return (
			<div>
				<DataFetcher />

				{navigationLinks &&
					<nav className="nav">
						<ul className="nav__menu list--plain">
							{navigationLinks.map((link, index) => {
								let hash = `/${link.linked_region}`;
								return (
									<li key={index} onClick={() => { this.updateCurrentRegion(index); }}>
										<NavLink
											to={hash}
											activeClassName="selected"
											activeStyle={{
											    fontWeight: 'bold',
											    color: 'tomato'
											   }}
											exact
											>{link.text}</NavLink>
									</li>
								);
							})}
						</ul>
					</nav>
				}

				<section className={this.props.transitionClass}>
					{this.state.isMovingView &&
						<article className="region text">
							<h1>PLACEHOLDER PREVIOUS</h1>
							<div><p>This was the previous view</p></div>
						</article>
					}
					{regions && regions.map((region, index) => {
						let hash = `/${region.path_hash}`;
						return (
							<Route 
								key={index}
								path={hash}
								render={() => (<Region data={region} onTran/>)} 						
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
        updateRegionData: state.regions.updateRegionData,
        currentRegion: state.regions.currentRegion,
        transitionClass: state.regions.transitionClass
     //    skills: state.skills,
     //    demos: state.demos,
     //    projects: state.projects
    }
);

export default connect(mapStateToProps)(Application);
