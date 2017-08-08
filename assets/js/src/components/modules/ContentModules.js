import React, { PropTypes } from 'react';

import SkillsAccordion from './SkillsAccordion';
import DemosMenu from './DemosMenu';


const ContentModules = props => {
	return (
		<section className="module">
			<div className="container">
				{props.moduleType == 'skills_accordion' &&
					<SkillsAccordion
						skills={props.data}
					/>
				}
				{props.moduleType == 'demos_menu' &&
					<DemosMenu
						demos={props.data}
					/>
				}
				{props.moduleType == 'text' &&
					<p>TEXT CONTENT MODULE HERE!</p>
				}
			</div>
		</section>
	);	
}

ContentModules.propTypes = {
	moduleType: PropTypes.string.isRequired,
}

export default ContentModules;