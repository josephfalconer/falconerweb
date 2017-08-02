import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import DataFetcher from './DataFetcher';
import Region from '../components/Region';


class Application extends Component {

	state = {
		currentPageIndex: 0,
		currentPageData: null,
		isFrontCover: true,
		containerClass: 'main-container is-down', 
		sliderClass: 'slider',
	}

	componentDidMount() {
		// this.changePage();
	}

	getModuleData = module => {
		const { [module]:moduleData } = this.props;
		return moduleData ? moduleData : [];
	}

	changePage = (e, targetPageIndex=0) => {
		if (e) e.preventDefault();

		const app = this,
			difference = Math.abs(app.state.currentPageIndex - targetPageIndex),
			targetPageData = app.props.pages[targetPageIndex];

		let isChangingPage = targetPageIndex != app.state.currentPageIndex,

			isFrontCover = this.state.isFrontCover;
		
		if (targetPageData) {

			if (isChangingPage && !isFrontCover) {
				this.handleChangeFromPage(targetPageIndex, targetPageData);

			} else {

				app.setState({
					...app.state,
					currentPageIndex: targetPageIndex,
					currentPageData: targetPageData,
					isFrontCover: true,
					containerClass: 'main-container is-down',
					sliderClass: difference > 1 ? app.fadeAnimateSlider() : 'slider'
				});
			}
		}
	}

	handleChangeFromPage = (index, data) => {
		const app =this,
			mainClass = 'main-container',
			downClass = `${mainClass} is-down`,
			changingClass = `${downClass} is-changing-page`;

		app.setState({
			...app.state,
			isFrontCover: true,
			containerClass: changingClass,
			sliderClass: this.fadeAnimateSlider()
		});

		// keep current page data until fade out completes
		setTimeout(() => {
			app.setState({
				...app.state,
				currentPageIndex: index,
				currentPageData: data
			});
		}, 1000);

		// remove animation class once animation completes
		setTimeout(() => {
			app.setState({
				...app.state,
				containerClass: downClass
			});
		}, 2000);
	}

	fadeAnimateSlider = () => {
		const app = this;
		// reset the class attribute once animation completes
		setTimeout(() => {
			app.setState({...app.state, sliderClass: 'slider'});
		}, 2000);

		return "slider slider--fade";
	}

	slideCoverUp = () => {
		this.setState({
			...this.state, 
			isFrontCover: false,
			containerClass: 'main-container is-up'
		});
	}

	render() {	
		const currentPageData = this.state.currentPageData,
			currentModuleName = currentPageData && currentPageData.module_name,
			currentModuleData = currentPageData && this.getModuleData(currentModuleName);

		return (
			<div>
				<DataFetcher />

				<nav className="list--plain">
					{this.props.navigationLinks.map((link, index) => {
						let hash = `/${link.linked_region}`;
						return (
							<li key={index}>
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
				</nav>

				{this.props.regions.map((region, index) => {
					let hash = `/${region.path_hash}`;
					return (
						<Route 
							key={index}
							path={hash}
							render={() => (<Region title={region.title}/>)} 						
						/>
					);
				})}

			</div>
		)
	};
}


const mapStateToProps = state => (
    {
    	navigationLinks: state.navigationLinks,
        regions: state.regions,
        skills: state.skills,
        demos: state.demos,
        projects: state.projects
    }
);

export default connect(mapStateToProps)(Application);
