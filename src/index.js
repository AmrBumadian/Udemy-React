import ReactDOM from "react-dom/client";
import {NavBar} from './navBar';
import {CourseFullPage, CourseHeader, CourseNav} from './courseInfoPageComponents.js';
import {Footer} from './footer.js';
import React from "react";

import './styles/common.css';
import './styles/coursePage.css';

let currentKey = 0;
let apiUrl = "http://localhost:8000/";
const navBar = ReactDOM.createRoot(document.querySelector("#nav-bar"));
const courseHeader = ReactDOM.createRoot(document.querySelector("#course-header"));
const courseNav = ReactDOM.createRoot(document.querySelector("#course-nav"));
const mainSection = ReactDOM.createRoot(document.querySelector("#main-section"));
const footer = ReactDOM.createRoot(document.querySelector("#footer"));

window.onload = () => {
	navBar.render(<NavBar key={currentKey++}/>);
	fetchCourseData("JavaScript for Beginners");
};

function fetchCourseData(courseName) {
	courseName = courseName.replace(/\s/g, "");
	fetch(apiUrl + courseName)
		.then((response) => response.json())
		.then((data) => {
			renderWholePage(data)
		});
}

function renderWholePage(courseData) {
	courseHeader.render(<CourseHeader key={currentKey++} {...courseData.header}/>);
	courseNav.render(<CourseNav key={currentKey++}/>);
	mainSection.render(<CourseFullPage key={currentKey++} {...courseData}/>)
	footer.render(<Footer key={currentKey++}/>)
}