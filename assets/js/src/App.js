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
						description: page.fields.description,
						icon: page.fields.icon
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

	changeDisplay = (e, index=0) => {
		if (e) e.preventDefault();

		const targetPage = this.state.pages[index];

		if (targetPage) {
			this.setState({
				...this.state,
				currentPageIndex: index,
				currentPage: targetPage
			});
		} 
	}

	render() {
		const pages = this.state.dataReady ? this.state.pages : [],
			currentPage = this.state.currentPage;

		return (
			<div>
				{pages.length > 0 ? 
					<FrontCover
						isFrontCover={this.state.currentPageIndex === 0}
						pages={pages}
						onClick={this.changeDisplay}
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
	}
}

ReactDOM.render(<Application/>, document.getElementById('application'));