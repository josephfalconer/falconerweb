import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStoreState } from '../../actions';

class ToolsAccordion extends PureComponent {
  componentDidMount() {
    if (!this.props.tools.length) {
      fetch('/api/toolkit/')
      .then(response => response.json())
      .then(tools => this.props.updateStoreState({tools}));
    }
  }

  openPanel = (e, index) => {
    e.preventDefault();
    const contentBoxes = document.getElementsByClassName('accordion__contentinner');
    const targetPanelHeight = contentBoxes[index].offsetHeight / 16;
    // if current panel was clicked close the current panel
    this.props.updateStoreState({
      currentAccordionIndex: index == this.props.currentAccordionIndex ? -1 : index,
      currentAccordionHeight: `${targetPanelHeight}rem`
    });
  }

  render() {
    return (
      <div>
        <div className="accordion text">
          {this.props.tools.map((tool, index) => {
            const isCurrentPanel = index == this.props.currentAccordionIndex;
            const panelClass = isCurrentPanel ? 'accordion__panel accordion__panel--current' : 'accordion__panel';
            const heightStyle = {
              height: isCurrentPanel ? this.props.currentAccordionHeight : '6.25rem'
            };
            return (
              <article className={panelClass} key={`accordion-panel-${index}`}>
                <div className="accordion__heading">
                  <a className="accordion__trigger" href="" onClick={e => { this.openPanel(e, index); }}>
                    <div className="column">
                      <h3 className="accordion__title">{tool.title}</h3>
                      <span className="accordion__tooltip accordion__read">Read</span>
                      <span className="accordion__tooltip accordion__close">Close</span>
                    </div>
                  </a>
                </div>
                <div className="accordion__content" style={heightStyle}>
                  <div className="accordion__contentinner" dangerouslySetInnerHTML={{__html: tool.text}}></div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="page__intro">
          Click
          {' '}
          <Link to="/demos/play">here</Link>
          {' '}
          to play some JavaScript games I made.
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({tools, currentAccordionIndex, currentAccordionHeight}) => (
  {
    tools: tools || [],
    currentAccordionIndex,
    currentAccordionHeight
  }
);

export default connect(mapStateToProps, {
  updateStoreState
})(ToolsAccordion);
