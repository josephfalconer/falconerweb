import React from 'react';

import IconLogo from './IconLogo';
import IconProjects from './IconProjects';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';

export default function Icon(props) {
  switch (props.iconType) {
    case 'LOGO':
      return <IconLogo />;
    case 'TOOLS':
      return <IconSkills />;
    case 'PROJECTS':
      return <IconProjects />;
    case 'DEMOS':
      return <IconDemos />;
    default:
      return null;
  }
}
