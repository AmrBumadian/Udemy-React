import React from 'react';
import {Rating} from './courseCard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAward, faCirclePlay, faStar, faUserGroup} from '@fortawesome/free-solid-svg-icons'

class CourseHeader extends React.Component {
	render() {
		return (
			<section>
				<h2>{this.props.courseName}</h2>
				<p>{this.props.courseTitle}</p>
				<Rating rate={this.props.courseRate} ratesCount={this.props.ratingsCount}
				        enrolled={this.props.enrolled}/>
				<span>Created by <span className="underlined">{this.props.author}</span></span>
			</section>
		)
	}
}

class CourseNav extends React.Component {
	render() {
		return (
			<section>
				<span>Overview</span>
				<span>Curriculum</span>
				<span>Instructor</span>
				<span>Reviews</span>
			</section>
		)
	}
}

class CourseOverview extends React.Component {
	render() {
		let currentKey = 0;
		let whatYouWillLearn = this.props.learning.map((s) => <li key={currentKey++}>{s}</li>);
		return (
			<section id="overview">
				<h2>What you'll learn</h2>
				<ul>
					{whatYouWillLearn}
				</ul>
			</section>
		)
	}
}

class CourseContent extends React.Component {

	render() {
		let currentKey = 0;
		let courseContent = this.props.courseContent.map((section) => {
			let childKey = 0;
			return (
				<section key={currentKey++}>
					<label htmlFor={section.sectionName}/>
					<select name={section.sectionName}>
						{section.contents.map((lectureName) => <option key={childKey++}>{lectureName}</option>)}
					</select>
				</section>
			)
		});
		return (
			<section>
				<h2>Course content</h2>
				<section>
					{courseContent}
				</section>
			</section>
		)
	}
}

class CourseDescription extends React.Component {
	render() {
		let currentKey = 0;
		let requirements = this.props.requirements.map((r) => <li key={currentKey++}>{r}</li>);
		let description = this.props.description.map((d) => <p key={currentKey++}>{d}</p>)
		return (
			<section>
				<section id="requirements">
					<h2>Requirements</h2>
					<ul>
						{requirements}
					</ul>
				</section>
				<section id="description">
					<h2>Description</h2>
					{description}
				</section>
			</section>
		)
	}
}

class CourseInstructors extends React.Component {
	render() {
		let currentKey = 0;
		let instructors = this.props.instructors.map((inst) => {
			let bio = inst.bio.map((b) => <p key={currentKey++}>{b}</p>);
			return (
				<section key={currentKey++} className="instructor">
					<h3 className="bold-underlined">{inst.name}</h3>
					<h4>{inst.title}</h4>
					<section className="instructor-info">
						<img src={`${process.env.PUBLIC_URL}${inst.pic}`} alt="instructor's logo"/>
						<section className="icons">
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faStar}/>
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faAward}/>
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faUserGroup}/>
							<FontAwesomeIcon className="icon" key={currentKey++} icon={faCirclePlay}/>
						</section>
						<section className="info">
							<span>{inst.rate} Instructor Rating</span>
							<span>{inst.reviewsCount} Reviews</span>
							<span>{inst.studentsCount} Students</span>
							<span>{inst.coursesCount} Courses</span>
						</section>
					</section>
					<section id="instructor-bio">{bio}</section>
				</section>
			);
		});

		return (
			<section id="instructors">
				<h2>Instructors</h2>
				{instructors}
			</section>
		)
	}
}


class CourseFullPage extends React.Component {
	render() {
		return (
			<main>
				<CourseOverview learning={this.props.learning}/>
				<CourseContent courseContent={this.props.courseContent}/>
				<CourseDescription requirements={this.props.requirements} description={this.props.description}/>
				<CourseInstructors instructors={this.props.instructors}/>
			</main>
		)
	}
}

export {
	CourseHeader,
	CourseNav,
	CourseFullPage
}