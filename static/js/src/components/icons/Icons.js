import React from 'react';

import IconLogo from './IconLogo';
import IconProjects from './IconProjects';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';

const Icons = {
  LOGO: () => <IconLogo />,
  TOOLS: () => <IconSkills />,
  PROJECTS: () => <IconProjects />,
  DEMOS: () => <IconDemos />
}

export default Icons;
