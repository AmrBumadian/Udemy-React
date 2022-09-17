import {useParams} from "react-router-dom";
import React from "react";

class SearchResult extends React.Component {
	render () {
		return (
			<section></section>
		)
	}
}

export function SearchResultWrapper() {
	let params = useParams();
	return (<SearchResult params={{...params}}/>);
}