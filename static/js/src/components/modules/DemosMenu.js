import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateStoreState } from '../../actions';

function getHSL() { 
  // within blue colour range
  let randomHue = Math.floor(Math.random() * (240 - 170 + 1 ) + 170);
  return `hsl(${randomHue}, 90%, 30%)`;
}

class ModuleDemos extends PureComponent {
	static propTypes = {
		demos: PropTypes.array.isRequired,
	};

	componentDidMount() {
    this.interval = setInterval(this.setBackgrounds, 3000);
    fetch('api/demos/')
    .then(response => response.json())
    .then(demos => this.props.updateStoreState({demos}));
	};

	componentWillUnmount() {
		clearInterval(this.interval);
	};

  componentDidUpdate(prevProps) {
    if (prevProps.demos.length !== this.props.demos.length) {
      this.setBackgrounds();
    }
  }

	setBackgrounds = () => {
  	const demoBackgroundColours = this.props.demos.map(() => getHSL());
    this.props.updateStoreState({demoBackgroundColours});
	}

	render() {
    const { demos, demoBackgroundColours } = this.props;
		return (
			<ul className="demosfeature list--plain text" data-js="ShiftingBackgrounds">
				{demos.map((demo, index) => {
          let backgroundStyle = {}
          if (demoBackgroundColours.length) {
            backgroundStyle['backgroundColor'] = demoBackgroundColours[index];
          }
					return (
						<li className="demosfeature__item" key={`demo-${index}`} style={backgroundStyle}>
	            <a className="demosfeature__link" target="_blank" rel="noopener noreferrer" href={`${window.location.origin}/demos/${demo.path}`}>
                <div className="demosfeature__text">
                  <h4 className="demosfeature__title">{demo.title}</h4>
                  <p className="demosfeature__description" dangerouslySetInnerHTML={{__html: demo.text}}></p>
                </div>
                <span className="demosfeature__tooltip">Open</span>
	            </a>
  	        </li>
					);
				})}
			</ul>
		);
	} 	
}

function mapStateToProps({demos, demoBackgroundColours}) {
  return { 
  	demos: demos || [],
    demoBackgroundColours: demoBackgroundColours || []
  }
}

export default connect(mapStateToProps, {
  updateStoreState
})(ModuleDemos);
