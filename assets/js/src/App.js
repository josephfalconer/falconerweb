import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FrontCover from './FrontCover';
import Page from './Page';


class Application extends Component {

	state = {
		pages: [],
		currentPage: null,
		dataReady: false,
		// SET VIA DJANGO ADMIN
		coverTitle: 'Welcome aliens!',
		homePageState: 'down'
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
						title: page.fields.title,
						description: page.fields.description
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

	changeDisplay = (e, title=this.state.coverTitle) => {
		if (e) e.preventDefault();

		const targetPage = this.getTargetPage(title);

		if (targetPage) {
			this.setState({
				...this.state,
				currentPage: targetPage
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
		const pages = this.state.dataReady ? this.state.pages : [],
			currentPage = this.state.currentPage,
			isFrontCover = currentPage ? currentPage.title == this.state.coverTitle : false;

		return (
			<div>
				{pages.length && 
					<FrontCover
						isFrontCover={isFrontCover}
						pages={pages}
						coverTitle={this.state.coverTitle}
						onclick={this.changeDisplay}
					/>
				}

				{currentPage &&
					<Page 
						currentPage={currentPage}
					/>
				}
			</div>
		)
	}
}

ReactDOM.render(<Application/>, document.getElementById('application'));