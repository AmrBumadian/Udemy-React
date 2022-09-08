import React from 'react';
import {CourseCard} from './courseCard';
import ReactDOM from 'react-dom/client';
import './styles/home.css';

const courses = ReactDOM.createRoot(document.querySelector("#courses"));
let coursesCategories = document.querySelector(".categories");
let searchBar = document.querySelector("#search-bar");
let apiUrl = "http://localhost:8000/";
let allCoursesCache = [];
let currentShownCategory = "JavaScript";

window.onload = () => fetchCoursesOfCategory(currentShownCategory);

// search bar typing listener
let debouncer = (callback, delay) => {
	let timer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => callback.apply(context, args), delay);
	}
};
searchBar.addEventListener("input", debouncer(event => {
	let searchQuery = event.target.value;
	if (searchQuery === "") return;
	if (allCoursesCache.length === 0) fetchAllCoursesIn(allCoursesCache, searchQuery);
	else {
		let filteredCourses = filterCoursesByPattern(searchQuery);
		displaySearchResult(filteredCourses);
	}
}, 500));

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
		if (course.name.search(new RegExp(searchQuery, "i")) !== -1) {
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
		return (
			<CourseCard key={index} imageSrc={course.imageSrc} imageAlt={course.imageAlt} courseName={course.name}
			            author={course.author} rate={course.rating} enrolled={course.enrolled}
			            price={course.currentPrice}
			            oldPrice={course.oldPrice}/>
		)
	});
	courses.render(coursesCard);
}