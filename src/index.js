import React from 'react';
import {HomePageComponent} from './Components/HomePageComponent';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {GetFullPage} from "./Components/CourseInfoPageComponents";

import './styles/common.css'

const appRoot = ReactDOM.createRoot(document.querySelector("#react-body"));
appRoot.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePageComponent/>}/>
			<Route path="/courses">
				<Route path=":courseName" element={<GetFullPage/>}/>
			</Route>
		</Routes>
	</BrowserRouter>
);