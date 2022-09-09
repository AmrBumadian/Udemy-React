import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class PrevArrow extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<button id="prev-button" onClick={this.props.onClick}><i className="fa fa-chevron-left"/></button>
		)
	}
}

class NextArrow extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<button id="next-button" onClick={this.props.onClick}><i className="fa fa-chevron-right"/></button>
		)
	}
}

class Slicker extends React.Component {
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}

	next() {
		this.slider.slickNext();
	}

	previous() {
		this.slider.slickPrev();
	}

	render() {
		const settings = {
			infinite: true,
			autplay: true,
			autoplaySpeed: 2000,
			speed: 1000,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 800,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 650,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			],
		};
		return (
			<section>
				<Slider ref={c => (this.slider = c)} {...settings}>{this.props.courses}</Slider>
				<NextArrow onClick={this.next}/>
				<PrevArrow onClick={this.previous}/>
			</section>
		)
	}
}

class CourseCard extends React.Component {
	render() {
		return (
			<section className="course">
				<img src={`${process.env.PUBLIC_URL}${this.props.imageSrc}`} alt={this.props.imageAlt}/>
				<h4 className="course-name">{this.props.courseName}</h4>
				<h5 className="author">{this.props.author}</h5>
				<Rating rate={this.props.rate} enrolled={this.props.enrolled}/>
				<section>
					<span className="price">{this.props.currentPrice}</span>
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
	CourseCard,
	Slicker
}
