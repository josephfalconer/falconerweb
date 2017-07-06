import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavItem from './NavItem';


class Application extends Component {

	state = {
		viewingSheet: false,
		sheets: []
	};

	componentWillMount() {
		const app = this,
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				let data = JSON.parse(xhr.responseText),
					sheets = [];

				for (let sheet of data) {
					sheets.push({
						title: sheet.fields.title
					});
				}

				app.setState({
					...app.state,
					sheets: sheets
				});
			}
		}
		xhr.open('GET', 'sheets/');
		xhr.send();
	}

	componentDidMount() {
		// code...
	};

	render() {
		let sheets = this.state.sheets;

		return (
			<main>
				<header className="section__header">
					{sheets.length > 0 ?
						<nav className="nav">
							<ul>
								{sheets.map(function(sheet, index) {
									return (
										<NavItem
				                        	title={sheet.title}
				                        	key={index}
				                        /> 
									);
			                    }.bind(this))}
							</ul>
						</nav>
						:
						null
					}
					<h1>Testing the Applications base</h1>
				</header>
			</main>
		)
	}
}

ReactDOM.render(<Application/>, document.getElementById('application'));