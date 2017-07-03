import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Application extends Component {

	state = {
		sheets: [],
	};

	componentWillMount() {
		const app = this,
			xhr = new XMLHttpRequest();

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				let data = JSON.parse(xhr.responseText);

				for (let i = 0; i < data.length; i++) {
					app.state.sheets.push({
						title: data[i].fields.title
					});
				}
			}
		}
		xhr.open('GET', 'sheets/');
		xhr.send();
	}

	clickTest = e => {
		e.preventDefault();
		for (let i = 0; i < this.state.sheets.length; i++) {
			console.log(this.state.sheets[i]);
		}
	};

	render() {
		return (
			<div>
				<h1>Testing the Application base</h1>
				<a href="#" onClick={e=>{this.clickTest(e)}}>Click me to test</a>
			</div>
		)
	}
}

ReactDOM.render(<Application/>, document.getElementById('application'));