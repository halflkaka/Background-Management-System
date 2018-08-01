import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';

//page
import Home from 'pages/home/index.jsx';
import Login from 'pages/login/index.jsx';
import ErrorPage from 'pages/error/index.jsx';
import UserList from 'pages/user/index.jsx';
import ProductRouter from 'pages/product/router.jsx';


class App extends React.Component{
	render(){
		let LayoutRouter = (
		<Layout>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/product" component={ProductRouter}/>
				<Route path="/product-category" component={Home}/>
				<Route path="/user/index" component={UserList}/>
				<Redirect exact from="/user" to="/user/index"/>
				<Route component={ErrorPage}/>
			</Switch>
		</Layout>
		);
		return (
			<Router>
				<Switch>
					<Route path="/login" component={Login}/>
					<Route path="/" render={props => (
						LayoutRouter
					)}/>
				</Switch>
			</Router>
		)
	}
}

ReactDom.render(
	<App/>
	,
	document.getElementById('app')
);

