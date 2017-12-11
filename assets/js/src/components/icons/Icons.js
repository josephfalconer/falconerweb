import React from 'react';

import IconLogo from './IconLogo';
import IconProjects from './IconProjects';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';


const Icons = {
	LOGO: () => {
		return <IconLogo/>;
	},
	SKILLS: () => {
		return <IconSkills/>;
	},
	PROJECTS: () => {
		return <IconProjects/>;
	},
	DEMOS: () => {
		return <IconDemos/>;
	}
}

export default Icons;