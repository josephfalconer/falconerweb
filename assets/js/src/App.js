import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Navigation from './Navigation';
import Page from './Page';


class Application extends Component {

	state = {
		pages: [],
		openPage: null,
		dataReady: false
	};

	componentWillMount() {
		const app = this,
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				const data = JSON.parse(xhr.responseText);
				let pages = [];

				for (let page of data) {
					pages.push({
						title: page.fields.title
					});
				}

				app.setState({
					...app.state,
					pages: pages,
					dataReady: true
				});

				app.changeDisplay();
			}
		}
		xhr.open('GET', 'pages/');
		xhr.send();
	}

	getPageTitles = () => {
		let pageTitles = [];

		for (let page of this.state.pages) {
			pageTitles.push(page.title);
		}

		return pageTitles;
	}

	changeDisplay = (e, title="Welcome") => {
		if (e) e.preventDefault();

		const targetPage = this.getTargetPage(title);

		if (targetPage) {
			this.setState({
				...this.state,
				openPage: targetPage
			});
		} 
	}

	getTargetPage = title => {
		let targetPage = false;

		for (let page of this.state.pages) {
			if (page.title == title) {
				targetPage = page;
			} 
		}
		return targetPage;
	}

	render() {
		const pageTitles = this.state.dataReady ? this.getPageTitles() : null,
			openPage = this.state.openPage;

		return (
			<div>

				{pageTitles ?
					<Navigation 
						pageTitles={pageTitles}
						onclick={this.changeDisplay}
					/>
					:
					null
				}

				{openPage ? 
					<Page 
						openPage={openPage}
					/>
					:
					null
				}

			</div>
		)
	}
}

ReactDOM.render(<Application/>, document.getElementById('application'));