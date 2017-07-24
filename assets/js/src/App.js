import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FrontCover from './frontcover/FrontCover';
import Page from './Page';


class Application extends Component {

	state = {
		pages: [],
		currentPageIndex: 0,
		currentPageData: null,
		dataReady: false,
		homePageState: 'down'
	};

	dataModels = {
		pageModel: fields => {
			return {
				title: fields.title,
				description: fields.description,
				icon: fields.icon,
				background: fields.background,
				module: fields.module,
			}
		},
		skillModel: fields => {
			return {
				title: fields.title,
				text: fields.text
			}
		},
		projectModel: fields => {
			return {
				title: fields.title,
				text: fields.text,
				url: fields.url
			}
		},
		demoModel: fields => {
			return {
				title: fields.title,
				text: fields.text,
				path: fields.path
			}
		}
	}

	componentWillMount() {
		const App = this,
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				let data = JSON.parse(xhr.responseText);
				data = App.sortData(data);

				App.setState({
					...App.state,
					pages: data.pages,
					skills: data.skills,
					projects: data.projects,
					demos: data.demos,
					dataReady: true
				});

				App.changePage();
			}
		}
		xhr.open('GET', 'data/');
		xhr.send();
	};

	sortData = data => {

		const dataModels = this.dataModels;

		let sortedData = {
			'pages': [],
			'skills': [],
			'projects': [],
			'demos': []
		}

		for (let dataItem of data) {

			switch(dataItem.model) {
				case 'pages.page':
					sortedData.pages.push( dataModels.pageModel(dataItem.fields) );
					break;

				case 'skills.skill':
					sortedData.skills.push( dataModels.skillModel(dataItem.fields) );
					break;

				case 'projects.project':
					sortedData.projects.push( dataModels.projectModel(dataItem.fields) );
					break;

				case 'demos.demo':
					sortedData.demos.push( dataModels.demoModel(dataItem.fields) );
					break;

				default:
					console.log(`The model ${model} didn't find a match!`);
			}
		}
		return sortedData;
	};

	changePage = (e, targetPageIndex=0) => {
		if (e) e.preventDefault();

		const targetPageData = this.state.pages[targetPageIndex];

		if (targetPageData) {
			this.setState({
				...this.state,
				currentPageIndex: targetPageIndex,
				currentPageData: targetPageData
			});
		} 
	};

	getModuleData = module => {
		const { [module]:moduleData } = this.state;
		return moduleData ? moduleData : [];
	};

	render() {
		const pages = this.state.dataReady ? this.state.pages : [],
			currentPageData = this.state.currentPageData,
			currentModuleName = currentPageData && currentPageData.module,
			currentModuleData = currentPageData && this.getModuleData(currentModuleName);

		return (
			<div>
				{pages.length > 0 ? 
					<FrontCover
						isFrontCover={this.state.currentPageIndex === 0}
						pages={pages}
						currentPageIndex={this.state.currentPageIndex}
						onClick={this.changePage}
					/>
					:
					null
				}

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

ReactDOM.render(<Application/>, document.getElementById('application'));