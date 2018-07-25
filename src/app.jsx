import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';

//page
import Home from 'pages/home/index.jsx';


class App extends React.Component{
	render(){
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/product" component={Home}/>
						<Route path="/product-category" component={Home}/>
					</Switch>
				</Layout>
			</Router>
		)
	}
}

ReactDom.render(
	<App/>
	,
	document.getElementById('app')
);

