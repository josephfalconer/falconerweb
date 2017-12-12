import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';


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

						const isCurrentSkill = index == currentIndex,
							skillClass = isCurrentSkill ? 'skillsfeature__skill skillsfeature__skill--current' : 'skillsfeature__skill',
							heightValue = isCurrentSkill ? this.state.currentSkillHeight : '6.25rem',
							heightStyle = {
								height: heightValue
							};

						return (
							<article className={skillClass} key={index}>
						        <div className="skillsfeature__heading">
						        	<a className="skillsfeature__trigger" href="#" onClick={e => { this.changeSkill(e, index); }}>
					            		<div className="column">
					            			<h3 className="skillsfeature__title">{skill.title}</h3>
								            <span className="skillsfeature__tooltip skillsfeature__read">Read</span>
								            <span className="skillsfeature__tooltip skillsfeature__close">Close</span>
					            		</div>
						        	</a>
						        </div>
						        <div className="skillsfeature__content" style={heightStyle}>
						            <div className="skillsfeature__contentinner" dangerouslySetInnerHTML={{__html: skill.text}}></div>
						        </div>
						    </article>
						);
					})}
				</div>
			</div>
		);
	} 	
}

const mapStateToProps = state => (
    { 
    	skills: state.data.skills,
    }
);

export default connect(mapStateToProps)(ModuleSkills);