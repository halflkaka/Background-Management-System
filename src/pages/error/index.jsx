import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import {Link} from 'react-router-dom';

class Error extends React.Component{
	constructor(props) {
		super(props);
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="Error"/>
				<div className="row">
					<div className="col-md-12">
						<span>Can't find path, </span>
						<Link to="/">Back to index</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Error;
