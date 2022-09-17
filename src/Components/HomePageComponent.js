import React from 'react';
import {NavBarComponent} from "./NavBarComponent";
import {Slicker} from "./CourseCardComponent";

import '../styles/home.css';

let allCoursesCache = [];
let apiUrl = "http://localhost:5000/";

class HomeHeader extends React.Component {
	render() {
		return (
			<header id="home-header">
				<section>
					<h2> 24-Hour Flash Sale</h2>
					<p>
						Learn valuable, practical skills for less. Log in to see deals on courses. Sale ends tonight!
					</p>
				</section>
				<img src={`${process.env.PUBLIC_URL}/assets/images/holding-clock.jpg`} alt="Man holding a sand-clock"/>
			</header>
		);
	}
}

class CourseCategory extends React.Component {

	constructor(props) {
		super(props);
		this.categoriesData = this.props.coursesData;
		this.categoriesNames = Object.keys(this.categoriesData);
		this.state = {
			currentShownCategory: this.categoriesNames.at(0),
			categoryData: this.categoriesData[this.categoriesNames.at(0)]
		}
	}

	chooseCategory(event) {
		if (event.button !== 0) return;
		let clickedListElement = event.target;
		let chosenElementId = clickedListElement.getAttribute("id");
		if (event.target.tagName !== "LI" || this.state.currentShownCategory === chosenElementId) return;
		document.querySelector(".chosen-category").classList.remove("chosen-category");
		clickedListElement.classList.add("chosen-category");
		let newCategoryData = this.categoriesData[chosenElementId];
		this.setState({currentShownCategory: chosenElementId, categoryData: newCategoryData})
		event.stopPropagation();
	}

	render() {
		let currentKey = 0;
		let items = this.categoriesNames.map((c) => {
			if (c === this.state.currentShownCategory) {
				return <li key={currentKey++} id={c.replace(/\s/g, "")}
				           className="chosen-category">{this.categoriesData[c].name}</li>;
			}
			return <li key={currentKey++} id={c.replace(/\s/g, "")}>{this.categoriesData[c].name}</li>;
		});
		let currentCategory = this.categoriesData[this.state.currentShownCategory];
		if (currentCategory === "") return (<section></section>);
		return (
			<section>
				<ul className="categories" onClick={(e) => this.chooseCategory(e)}>
					{items}
				</ul>
				<section className="category">
					<h3>{currentCategory.title}</h3>
					<p className="category-description">{currentCategory.description}</p>
					<button id="explore-category">Explore {currentCategory.name}</button>
					<section id="courses" className="courses"><Slicker courses={currentCategory.courses}/>
					</section>
				</section>
			</section>
		)
	}
}

class HomeMain extends React.Component {

	render() {
		return (
			<main id="home-main">
				<h2>A broad selection of courses</h2>
				<p>
					Choose from 185,000 online video courses with new additions published
					every month
				</p>
				{(Object.keys(this.props.coursesData).length) ? <CourseCategory coursesData={this.props.coursesData}/> :
					<section></section>}
			</main>
		)
	}
}

export class HomePageComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			allCoursesData: {}
		}
	}

	componentDidMount() {
		this.fetchAllCoursesData();
	}

	componentWillUnmount() {
		allCoursesCache = [];
	}

	fetchAllCoursesData() {
		fetch(apiUrl + "db")
			.then(response => response.json())
			.then(data => {
				this.setState({
					allCoursesData: data
				});
				for (let category in data) {
					for (let course of data[category]["courses"]) {
						allCoursesCache.push(course);
					}
				}
			});
	}

	render() {
		return (
			<section>
				<NavBarComponent id="home-nav"/>
				<HomeHeader/>
				<HomeMain coursesData={this.state.allCoursesData}/>
			</section>
		)
	}
}