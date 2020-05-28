import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStoreState } from '../../actions';

const getContentRefName = index => `accordion-content-${index}`;

class ToolsAccordion extends PureComponent {
  constructor(props) {
    super(props);
    this.setAccordionContent = element => {
      if (element) {
        this[getContentRefName(element.getAttribute('index'))] = element;
      }
    }
  }

  componentDidMount() {
    if (!this.props.tools.length) {
      fetch('/api/toolkit/')
      .then(response => response.json())
      .then(tools => this.props.updateStoreState({tools}));
    }
  }

  render() {
    return (
      <div>
        {this.props.tools.length ? (
          <div className="accordion text">
            {this.props.tools.map((tool, index) => {
              const isCurrentSection = index == this.props.currentAccordionSection;
              return (
                <article key={`accordion-section-${index}`} className="accordion__section">
                  <a className="accordion__heading" href="">
                    <h3
                      index={index}
                      onClick={this.openSection}
                      className="accordion__title"
                    >
                      {tool.title}
                    </h3>
                    <span className="accordion__tooltip">
                      {isCurrentSection ? 'Close' : 'Open'}
                    </span>
                  </a>
                  <div className="accordion__content" style={this.getHeightStyle(isCurrentSection)}>
                    <div
                      ref={this.setAccordionContent}
                      index={index}
                      className="accordion__contentinner"
                      dangerouslySetInnerHTML={{__html: tool.text}}
                    ></div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : 'Loading...'}
      </div>
    );
  }

  getHeightStyle = isCurrentSection => ({
    height: isCurrentSection ? this.props.currentAccordionSectionHeight : '0'
  });

  openSection = event => {
    event.preventDefault();
    const index = event.target.getAttribute('index');
    const contentHeight = this[getContentRefName(index)].offsetHeight;
    // Close sec if the current section was clicked
    this.props.updateStoreState({
      currentAccordionSection: index == this.props.currentAccordionSection ? -1 : index,
      currentAccordionSectionHeight: `${contentHeight / 16}rem`
    });
  }
}

const mapStateToProps = ({
  tools,
  currentAccordionSection,
  currentAccordionSectionHeight
}) => (
  {
    tools: tools || [],
    currentAccordionSection,
    currentAccordionSectionHeight
  }
);

export default connect(mapStateToProps, {
  updateStoreState
})(ToolsAccordion);
