import React from 'react';

import { ICONS } from '../../constants';
import IconLogo from './IconLogo';
import IconProjects from './IconProjects';
import IconSkills from './IconSkills';
import IconDemos from './IconDemos';

export default function Icon(props) {
  switch (props.iconType) {
    case ICONS.LOGO:
      return <IconLogo />;
    case ICONS.TOOLS:
      return <IconSkills />;
    case ICONS.PROJECTS:
      return <IconProjects />;
    case ICONS.DEMOS:
      return <IconDemos />;
    default:
      return null;
  }
}
