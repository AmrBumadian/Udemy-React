import React from 'react';
import {Rating} from './courseCard';

class CourseHeader extends React.Component {
	render() {
		return (
			<section>
				<h2>{this.props.courseName}</h2>
				<p>{this.props.courseTitle}</p>
				<Rating rate={this.props.courseRate} ratesCount={this.props.ratingsCount} enrolled={this.props.enrolled}/>
				<span>Created by <span className="underlined">{this.props.author}</span></span>
			</section>
		)
	}
}

class CourseOverview extends React.Component {
	render() {
		let currentKey = 0;
		let whatYouWillLearn = this.props.learning.map((s) => <li key={currentKey++}>{s}</li>);
		return (
			<section>
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
		return (
			<section>
				<section>
					<h2>Requirements</h2>
					<ul>
						{requirements}
					</ul>
				</section>
				<section>
					<h2>Description</h2>
					<p>{this.props.description}</p>
				</section>
			</section>
		)
	}
}

class CourseInstructors extends React.Component {
	render() {
		let currentKey = 0;
		let instructors = this.props.instructors.map((inst) => {
			return (<section key={currentKey++}>
				<section>
					<h3>{inst.name}</h3>
					<h4>{inst.title}</h4>
					<img src={inst.pic} alt="instructor's smiling"/>
					<span><i></i> {inst.rate} Instructor Rating</span>
					<span><i></i> {inst.reviewsCount} Reviews</span>
					<span><i></i> {inst.studentsCount} Students</span>
					<span><i></i> {inst.coursesCount} Courses</span>
				</section>
				<p>{inst.bio}</p>
			</section>);
		});

		return (
			<section>
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
	CourseFullPage
}