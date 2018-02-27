import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Icons from './icons/Icons';
import ContentModules from './modules/ContentModules';


function renderContentModules(data) {
	const { content_modules } = data;
	if (content_modules && content_modules.length) {
		return content_modules.map((module, index) => {
			const Module = ContentModules[module.module_type];
			return Module ? Module(module, index) : null;
		})
	}
	return null;
}

const Region = props => {
	const { data, contentModules } = props;
	const Icon = Icons[data.icon.toUpperCase()];
	let regionInnerClass = `region__inner text text--${data.text_colour}`;
	if (!data.content_modules && data.center_content) {
		regionInnerClass += ' center-content';
	}
	if (!data.center_content) {
		regionInnerClass += ' padding--ends';
	}
	return (
		<article className={props.regionClass}>
			<div className={regionInnerClass} style={{ backgroundImage: `url(${data.background})` }}>
				<div className="region__content">
					<header className="region__header container">
						{Icon && 
							<span className="region__icon">{Icon()}</span>
						}
						<h1 className="region__title">{data.display_title || data.title}</h1>
						{data.intro_text &&
							<p className="region__intro" dangerouslySetInnerHTML={{__html: data.intro_text}}></p>
						}
					</header>
					{renderContentModules(data)}
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
