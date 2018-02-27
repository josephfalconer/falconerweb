import React, { PropTypes } from 'react';

import SkillsAccordion from './SkillsAccordion';
import DemosMenu from './DemosMenu';


const ContentModules = {
	SKILLS_ACCORDION: (fields, index) => {
		return <SkillsAccordion key={`${fields.module_type}-${index}`} />;
	},
	DEMOS_MENU: (fields, index) => {
		return <DemosMenu key={`${fields.module_type}-${index}`} />;
	},
	TEXT: (fields, index) => {
		return <div key={`${fields.module_type}-${index}`} className="textblock container" dangerouslySetInnerHTML={{__html: fields.text}}></div>;
	}
}

export default ContentModules;