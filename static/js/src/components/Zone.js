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

const Zone = props => {
	const { data } = props;
	const Icon = Icons[data.icon.toUpperCase()];
	let zoneInnerClass = `region__inner text text--${data.text_colour}`;
	if (!data.content_modules && data.center_content) {
		zoneInnerClass += ' center-content';
	}
	if (!data.center_content) {
		zoneInnerClass += ' padding--ends';
	}
	return (
		<article className={props.zoneClass}>
			<div className={zoneInnerClass} style={{ backgroundImage: `url(${data.background})` }}>
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

Zone.propTypes = {
	data: PropTypes.object.isRequired,
	contentModules: PropTypes.array,
	zoneClass: PropTypes.string.isRequired,
}

export default Zone;
