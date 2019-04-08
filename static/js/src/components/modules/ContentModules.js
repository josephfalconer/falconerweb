import React, { PropTypes } from 'react';
import ToolsAccordion from './ToolsAccordion';
import Demos from './Demos';

const ContentModules = {
  TOOLS_ACCORDION: (fields, index) => {
    return <ToolsAccordion key={`${fields.module_type}-${index}`} />;
  },
  DEMOS_MENU: (fields, index) => {
    return <Demos key={`${fields.module_type}-${index}`} />;
  },
  TEXT: (fields, index) => {
    return <div key={`${fields.module_type}-${index}`} className="textblock container" dangerouslySetInnerHTML={{__html: fields.text}}></div>;
  }
}

export default ContentModules;
