import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Navigation from './Navigation';
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

	changeDisplay = (e, title=this.state.coverTitle) => {
		if (e) e.preventDefault();

		const targetPage = this.getTargetPage(title);

		if (targetPage) {
			this.setHomePage(targetPage);
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

	setHomePage = targetPage => {
		const currentState = this.state.homePageState;
		// const currentPage = this.state.currentPage;
		const newState = currentState == 'down' ? 'up' : 'down';

		console.log(currentState, targetPage);
		// this.setState()
	}

	render() {
		const pageTitles = this.state.dataReady ? this.getPageTitles() : null,
			currentPage = this.state.currentPage,
			isFrontCover = currentPage ? currentPage.title == this.state.coverTitle : false;

		return (
			<div>

				<div className={isFrontCover ? 'frontcover frontcover--down' : 'frontcover'}>
					<header className="header">
						<div className="header__content">
							<h1 className="header__title">Joseph Falconer | Web Developer</h1>
						</div>
					</header>

					{pageTitles ?
						<Navigation 
							coverTitle={this.state.coverTitle}
							pageTitles={pageTitles}
							onclick={this.changeDisplay}
						/>
						:
						null
					}
				</div>

				{currentPage ? 
					<Page 
						currentPage={currentPage}
					/>
					:
					null
				}

			</div>
		)
	}
}

ReactDOM.render(<Application/>, document.getElementById('application'));