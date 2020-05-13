import React from 'react';
import ToolsAccordion from './ToolsAccordion';
import Demos from './Demos';

export default function ContentModule(props) {
  switch (props.module.module_type) {
    case 'TOOLS_ACCORDION':
      return <ToolsAccordion />;
    case 'DEMOS_MENU':
      return <Demos />;
    case 'TEXT':
      return (
        <div className="textblock container" dangerouslySetInnerHTML={{__html: props.module.text}}></div>
      );
    default:
      return null;
  }
}
