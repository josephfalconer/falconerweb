import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class DirectionButton extends Component {
	state = {
		isVisible: false
	}

	componentWillReceiveProps() {
		const { isVisible } = this.props;
		this.setState({ isVisible: isVisible ? true : false });
	}

	render() {
		const { matchUrl, to, isMovingRegions, name, title } = this.props,
			formattedTo = matchUrl ? `${matchUrl}${to ? '/' + to : ''}` : to;

		const isVisibleProps = this.props.isVisible,
			isVisibleState = this.state.isVisible;

		let visibiltyClass = '';

		if (!isVisibleProps) {
			visibiltyClass = 'js-hidden-button';
		}

		if (!isVisibleState && isVisibleProps) {
			visibiltyClass = 'js-visible-button';
		}
		
		return (
			<Link 
				to={formattedTo}
				onClick={e => { if (isMovingRegions) e.preventDefault(); }} 
				className={`direction direction--${name} ${visibiltyClass}`}
			>
				<span className="direction__inner">
					<span className="direction__text is-displayed-lg">{title}</span>
					<span className="direction__icon">
						<i></i>
						<i></i>
					</span>
				</span>
			</Link>
		)
	}
}

const mapStateToProps = state => (
    {	
    	isMovingRegions: state.transitions.isMovingRegions,
    }
);

export default connect(mapStateToProps)(DirectionButton);