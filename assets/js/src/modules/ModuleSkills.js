import React, { PropTypes, Component } from 'react';


class ModuleSkills extends Component {

	static propTypes = {
		skills: PropTypes.array.isRequired,
	};

	state = {
		currentSkillIndex: null
	};

	changeSkill = (e, index) => {
		e.preventDefault();

		const contentBoxes = document.getElementsByClassName('skillsfeature__contentinner'),
			targetSkillHeight = contentBoxes[index].offsetHeight / 16;

		// if current skill was clicked close it
		this.setState({
			...this.state,
			currentSkillIndex: index == this.state.currentSkillIndex ? -1 : index,
			currentSkillHeight: `${targetSkillHeight}rem`
		});
	}

	render() {
		const currentIndex = this.state.currentSkillIndex;

		return (
			<div>
				<h4 className="skillsfeature__intro">Please click on headings to explore content...</h4>
				<div className="skillsfeature text">
					{this.props.skills.map((skill, index) => {

						// need to substitute Django's linebreaks filter
						// let TextContent = React.createElement(
						// 	'span',
						// 	html: skill.text
						// );
						// TextContent.dangerouslySetInnerHTML();

						let isCurrentSkill = index == currentIndex;
						
						let skillClass = isCurrentSkill ? 'skillsfeature__skill skillsfeature__skill--current' : 'skillsfeature__skill';
						
						let	heightValue = isCurrentSkill ? this.state.currentSkillHeight : '6.25rem';
						
						let heightStyle = {
							height: heightValue
						};

						return (
							<article className={skillClass} key={index}>
						        <div className="skillsfeature__heading">
						        	<a className="skillsfeature__trigger" href="#" onClick={e => { this.changeSkill(e, index); }}>
						        		<div className="row">
						            		<div className="column column-xs-12">
						            			<h3 className="skillsfeature__title">{skill.title}</h3>
									            <span className="skillsfeature__tooltip skillsfeature__read">Read</span>
									            <span className="skillsfeature__tooltip skillsfeature__close">Close</span>
						            		</div>
						            	</div>
						        	</a>
						        </div>
						        <div className="skillsfeature__content" style={heightStyle}>
						            <div className="skillsfeature__contentinner">
						            	<div className="row row--center">
						            		<div className="column column-xs-12 column-m-10" dangerouslySetInnerHTML={{__html: skill.text}}>
						            		</div>
						            	</div>
						            </div>
						            <div className="skillsfeature__overlay"></div>
						        </div>
						    </article>
						);
					})}
				</div>
			</div>
		);
	} 	
}


export default ModuleSkills;