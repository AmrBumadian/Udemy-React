import React from 'react';
import {CourseCard} from './courseCard';
import {Slicker} from './courseCard';
import {NavBar} from './navBar';
import ReactDOM from 'react-dom/client';

import './styles/home.css';

const courses = ReactDOM.createRoot(document.querySelector("#courses"));
const navBar = ReactDOM.createRoot(document.querySelector("#nav-bar"));
let coursesCategories = document.querySelector(".categories");
let apiUrl = "http://localhost:8000/";
let allCoursesCache = [];
let currentShownCategory = "JavaScript";

window.onload = () => {
	navBar.render(<NavBar cache={allCoursesCache} searchMethod={fetchAllCoursesIn} filter={filterCoursesByPattern}
	                      display={displaySearchResult}/>);
	fetchCoursesOfCategory(currentShownCategory);
};

// changing viewed course-category listener
coursesCategories.addEventListener("click", event => {
	if (event.button !== 0) return;
	let clickedListElement = event.target;
	if (event.target.tagName !== "LI" || currentShownCategory === clickedListElement.innerText) return;
	document.querySelector(".chosen-category").classList.remove("chosen-category");
	clickedListElement.classList.add("chosen-category");
	currentShownCategory = clickedListElement.innerText;
	fetchCoursesOfCategory(currentShownCategory);
	event.stopPropagation();
});

function fetchCoursesOfCategory(categoryName) {
	categoryName = categoryName.replace(/\s/g, "");
	fetch(apiUrl + categoryName)
		.then((response) => response.json())
		.then((data) => {
			displayNewCourseCategory(data)
		});
}

function fetchAllCoursesIn(allCoursesList, searchQuery) {
	fetch(apiUrl + "db")
		.then(response => response.json())
		.then(data => {
			fillAllCoursesData(allCoursesList, data);
			let filteredCourses = filterCoursesByPattern(searchQuery);
			displaySearchResult(filteredCourses);
		});
}

function fillAllCoursesData(allCoursesList, data) {
	for (let category in data) {
		for (let course of data[category]["courses"]) {
			allCoursesList.push(course);
		}
	}
}

function displaySearchResult(categoryList) {
	let categorySection = document.querySelector(".category");
	categorySection.querySelector("h3").innerText = "Search Results:";
	categorySection.querySelector(".category-description").innerText = "";
	categorySection.querySelector("#explore-category").hidden = true;
	displayAvailableCourses(categoryList);
}

function filterCoursesByPattern(searchQuery) {
	let filteredCourses = [];
	for (let course of allCoursesCache) {
		if (course.courseName.search(new RegExp(searchQuery, "i")) !== -1) {
			filteredCourses.push(course);
		}
	}
	return filteredCourses;
}

function displayNewCourseCategory(courseCategoryObject) {
	let categorySection = document.querySelector(".category");
	let categoryTitle = categorySection.querySelector("h3");
	let description = categorySection.querySelector(".category-description");
	let exploreButton = categorySection.querySelector("#explore-category");
	categoryTitle.innerText = courseCategoryObject?.title ?? "";
	description.innerText = courseCategoryObject?.description ?? "";
	exploreButton.hidden = false;
	exploreButton.innerHTML = `Explore ${courseCategoryObject?.name ?? ""}`;
	displayAvailableCourses(courseCategoryObject.courses);
}

function displayAvailableCourses(coursesDataArray) {
	if (coursesDataArray.length === 0) displayNoCourses();
	else displayCourses(coursesDataArray);
}

function displayNoCourses() {
	let noCoursesMessage = <h1 className="empty-courses">There are no available courses.</h1>
	courses.render(noCoursesMessage);
}

function displayCourses(coursesDataArray) {
	let index = 1;
	let coursesCard = coursesDataArray.map((course) => {
		++index;
		return (<CourseCard key={index} {...course}/>)
	});
	const slicker = <Slicker courses={coursesCard}/>
	courses.render(slicker);
}