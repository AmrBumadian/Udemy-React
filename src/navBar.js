import React from 'react';


class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.allCoursesCache = props.cache;
		this.fetchAllCoursesIn = props.searchMethod;
		this.filterCoursesByPattern = props.filter;
		this.displaySearchResult = props.display;
	}

	search() {
		let debouncer = (callback, delay) => {
			let timer;
			return function () {
				const context = this;
				const args = arguments;
				clearTimeout(timer);
				timer = setTimeout(() => callback.apply(context, args), delay);
			}
		};
		return debouncer(event => {
			let searchQuery = event.target.value;
			if (searchQuery === "") return;
			if (this.allCoursesCache.length === 0) this.fetchAllCoursesIn(this.allCoursesCache, searchQuery);
			else {
				let filteredCourses = this.filterCoursesByPattern(searchQuery);
				this.displaySearchResult(filteredCourses);
			}
		}, 500);
	}

	render() {
		return (
			<input id="search-bar" type="text" placeholder="Search for anything" onChange={this.search()}/>
		)
	}
}

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		return (
			<nav>
				<button id="hidden-menu">
					<i className="fa fa-bars fa-lg" aria-hidden="true"></i>
				</button>
				<img src={`${process.env.PUBLIC_URL}/assets/images/udemy-logo.svg`} className="logo" alt="Udemy Logo"/>
				<button>Categories</button>
				<form>
					<button type="submit">
						<i className="fa fa-search fa-lg" aria-hidden="true"></i>
					</button>
					<SearchBar {...this.props} searchMethod={this.props.searchMethod}/>
				</form>
				<button id="udemy-business">Udemy Business</button>
				<button id="udemy-teach">Teach on Udemy</button>
				<button>
					<i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
				</button>
				<button id="login">Log in</button>
				<button id="signup">Sign up</button>
				<button id="language">
					<i className="fa fa-globe fa-lg" aria-hidden="true"></i>
				</button>
				<span id="hidden-icons">
		            <button>
		                <i className="fa fa-search fa-lg" aria-hidden="true"></i>
		            </button>
		            <button>
		                <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
		            </button>
                </span>
			</nav>
		)
	}
}

export {
	NavBar
}