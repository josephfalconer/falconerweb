import React, { Component } from 'react';
import { connect } from 'react-redux';

import DataFetcher from './DataFetcher';
import FrontCover from '../components/FrontCover';
import Page from '../components/Page';


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
			<div className={this.state.containerClass}>

				<DataFetcher />

				<FrontCover
					pages={this.props.pages}
					currentPageIndex={this.state.currentPageIndex}
					changePage={this.changePage}
					sliderClass={this.state.sliderClass}
					slideCoverUp={this.slideCoverUp}
				/>

				{currentPageData &&
					<Page 
						currentPageData={currentPageData}
						currentModuleName={currentModuleName}
						currentModuleData={currentModuleData}
					/>
				}
			</div>
		)
	};
}

const mapStateToProps = state => (
    {
        pages: state.pages,
        skills: state.skills,
        demos: state.demos,
        projects: state.projects
    }
);

export default connect(mapStateToProps)(Application);
