import React from 'react';

class CourseCard extends React.Component {
	render() {
		return (
			<section className="course">
				<img src={`${process.env.PUBLIC_URL}${this.props.imageSrc}`} alt={this.props.imageAlt}/>
				<h4 className="course-name">{this.props.courseName}</h4>
				<h5 className="author">{this.props.author}</h5>
				<Rating rate={this.props.rate} enrolled={this.props.enrolled}/>
				<section>
					<span className="price">{this.props.price}</span>
					<span className="old-price">{this.props.oldPrice}</span>
				</section>
			</section>
		);
	}
}

class Rating extends React.Component {
	render() {
		return (
			<section className="rating">
				<span>{this.props.rate}</span>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star" aria-hidden="true"></i>
				<i className="fa fa-star-half-o" aria-hidden="true"></i>
				<span className="enrolled">({this.props.enrolled})</span>
			</section>
		);
	}
}

export {
	CourseCard
}
