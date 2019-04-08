import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateStoreState } from '../../actions';

function getHSL() {
  // within blue colour range
  let randomHue = Math.floor(Math.random() * (240 - 170 + 1 ) + 170);
  return `hsl(${randomHue}, 90%, 30%)`;
}

class Demos extends PureComponent {
	static propTypes = {
		demos: PropTypes.array.isRequired,
	};

	componentWillMount() {
    this.interval = setInterval(this.setBackgrounds, 3000);
    fetch('/api/demos/')
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
			<ul className="demos list--plain text" data-js="ShiftingBackgrounds">
				{demos.map((demo, index) => {
          let backgroundStyle = {}
          if (demoBackgroundColours.length) {
            backgroundStyle['backgroundColor'] = demoBackgroundColours[index];
          }
					return (
						<li className="demos__item" key={`demo-${index}`} style={backgroundStyle}>
	            <a
                className="demos__link"
                target="_blank"
                rel="noopener noreferrer"
                href={`/play/${demo.path}`}
              >
                <div className="demos__text center-content">
                  <h4 className="demos__title">{demo.title}</h4>
                  <p className="demos__description" dangerouslySetInnerHTML={{__html: demo.text}}></p>
                </div>
                <span className="demos__tooltip">Open</span>
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
})(Demos);
