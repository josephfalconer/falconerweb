import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';


class ModuleDemos extends Component {

	static propTypes = {
		demos: PropTypes.array.isRequired,
	};

	state = {
		backgroundColours: []
	};

	componentDidMount() {
		this.setBackgrounds();
		this.interval = setInterval(this.setBackgrounds, 10000);
	};

	componentWillUnmount() {
		clearInterval(this.interval);
	};

	setBackgrounds = () => {
		const getHSL = () => { 
            // within blue colour range
            let randomHue = Math.floor(Math.random() * (240 - 170 + 1 ) + 170),
                colorValue = `hsl(${randomHue}, 90%, 30%)`;
            return colorValue;
        }

    	let backgroundColours = [];

		// generate an array of colours 
		for (let demo of this.props.demos) {
			backgroundColours.push(getHSL());
		}

        this.setState({
        	...this.state,
        	backgroundColours: backgroundColours
        });
	}

	render() {
		const backgroundColours = this.state.backgroundColours;

		return (
			<ul className="demosfeature list--plain text" data-js="ShiftingBackgrounds">
				{this.props.demos.map((demo, index) => {
					
					let backgroundColor = backgroundColours[index],
						backgroundStyle = {
							backgroundColor: backgroundColor
						}

					return (
						<li className="demosfeature__item" key={index} style={backgroundStyle}>
				            <a className="demosfeature__link" target="_blank" rel="noopener noreferrer" href="{demo.path}">
				                <div className="demosfeature__text">
				                    <h4 className="demosfeature__title">{demo.title}</h4>
				                    <p className="demosfeature__description">{demo.text}</p>
				                </div>
				                <span className="demosfeature__tooltip">Fire it up</span>
				            </a>
				        </li>
					);
				})}
			</ul>
		);
	} 	
}

const mapStateToProps = state => (
    { 
    	demos: state.data.demos,
    }
);

export default connect(mapStateToProps)(ModuleDemos);