import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';
import * as RegionActionCreators from '../actions/regions';


class Region extends Component {

	static propTypes = {
		data: PropTypes.object.isRequired,
		contentModules: PropTypes.array.isRequired,
		// transitionRegion: PropTypes.func.isRequired,
	}
	
	componentDidMount() {
		const { dispatch, data } = this.props;
		this.setRegionData = bindActionCreators(RegionActionCreators.setRegionData, dispatch);
		this.setRegionData(data, 'SET_CURRENT_REGION');

		// console.log(this.props.transitionRegion);
		// this.props.transitionRegion(data.index);
	}

	render() {
		const { data } = this.props,
			backgroundStyle = { backgroundImage: `url(${data.background})` },
			longTitle = data.long_title;
		let { [data.icon]:Icon } = Icons;

		if (Icon) {
			Icon = Icon.call();
		}
		return (
			<article className="region text">
				<div className="region__inner" style={backgroundStyle}>
					<header>
						{Icon && <figure className="region__icon">{Icon}</figure>}
						<h1>{longTitle ? longTitle : data.title}</h1>
						<div dangerouslySetInnerHTML={{__html: data.intro_text}}></div>
					</header>

					{this.props.contentModules.map((contentModule, index) => {	
						if (contentModule.region == data.pk) {
							return (
								<ContentModules 
									key={index}
									moduleType={contentModule.module_type} 
								/>
							)
						} else {
							return null;
						}
					})}
				</div>
			</article>		
		)
	}
}

const mapStateToProps = state => (
    { 
    	contentModules: state.data.contentModules
    }
);

export default connect(mapStateToProps)(Region);
