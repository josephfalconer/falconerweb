import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FrontCover from './FrontCover';
import Page from './Page';


class Application extends Component {

	state = {
		pages: [],
		currentPageIndex: null,
		currentPage: null,
		dataReady: false,
		homePageState: 'down'
	};

	dataObjects = {
		pageObject: object => {
			return {
				title: object.fields.title,
				description: object.fields.description,
				icon: object.fields.icon,
				background: object.fields.background
			}
		},
		skillObject: object => {
			return {
				title: object.fields.title,
				text: object.fields.text
			}
		},
		projectObject: object => {
			return {
				title: object.fields.title,
				text: object.fields.text,
				url: object.fields.url
			}
		},
		demoObject: object => {
			return {
				title: object.fields.title,
				text: object.fields.text,
				path: object.fields.path
			}
		}
	}

	componentWillMount() {
		const app = this,
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				data = app.sortData(data);

				app.setState({
					...app.state,
					pages: data.pages,
					skills: data.skills,
					projects: data.projects,
					demos: data.demos,
					dataReady: true
				});

				app.changePage();
			}
		}
		xhr.open('GET', 'data/');
		xhr.send();
	};

	sortData = data => {

		const dataObjects = this.dataObjects;

		let sortedData = {
			'pages': [],
			'skills': [],
			'projects': [],
			'demos': []
		}

		for (let object of data) {

			switch(object.model) {
				case 'pages.page':
					sortedData.pages.push( dataObjects.pageObject(object) );
					break;

				case 'skills.skill':
					sortedData.skills.push( dataObjects.skillObject(object) );
					break;

				case 'projects.project':
					sortedData.projects.push( dataObjects.projectObject(object) );
					break;

				case 'demos.demo':
					sortedData.demos.push( dataObjects.demoObject(object) );
					break;

				default:
					console.log(`The model ${model} didn't find a match!`);
			}
		}
		return sortedData;
	};

	changePage = (e, index=0) => {
		if (e) e.preventDefault();

		const targetPage = this.state.pages[index];

		if (targetPage) {
			this.setState({
				...this.state,
				currentPageIndex: index,
				currentPage: targetPage
			});
		} 
	};

	render() {
		const pages = this.state.dataReady ? this.state.pages : [],
			currentPage = this.state.currentPage;

		return (
			<div>
				{pages.length > 0 ? 
					<FrontCover
						isFrontCover={this.state.currentPageIndex === 0}
						pages={pages}
						onClick={this.changePage}
					/>
					:
					null
				}

				{currentPage &&
					<Page 
						currentPage={currentPage}
					/>
				}
			</div>
		)
	};
}

ReactDOM.render(<Application/>, document.getElementById('application'));