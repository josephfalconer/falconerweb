import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';
import * as RegionActionCreators from '../actions/transitions';


const Region = props => {

	const { data, contentModules } = props,
		backgroundStyle = { backgroundImage: `url(${data.background})` };

	let { [data.icon]:Icon } = Icons,
		regionInnerClass = `region__inner text text--${data.text_colour}`;

	if (data.center_content) {
		regionInnerClass +=  ' center-content';
	}
	
	if (Icon) {
		Icon = Icon.call();
	}

	return (
		<article className={props.regionClass}>
			<div className={regionInnerClass} style={backgroundStyle}>
				<div className="region__content">
					<header>
						{Icon && <span className="region__icon">{Icon}</span>}
						<h1>{data.display_title || data.title}</h1>
						<div className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></div>
					</header>

					{contentModules.map((contentModule, index) => {	
						if (contentModule.region == data.title) {
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
			</div>
		</article>		
	)
}

Region.propTypes = {
	data: PropTypes.object.isRequired,
	contentModules: PropTypes.array,
	regionClass: PropTypes.string.isRequired,
}

const mapStateToProps = state => (
    {
    	contentModules: state.data.contentModules
    }
);

export default connect(mapStateToProps)(Region);