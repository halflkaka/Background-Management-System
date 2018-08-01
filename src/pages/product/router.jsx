import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';


//page
import ProductList from 'pages/product/index/index.jsx';


class ProductRouter extends React.Component{
	render(){
		return (
				<Switch>
					<Route path="/product/index" component={ProductList}/>
					<Redirect exact from='/product' to="/product/index" />
				</Switch>
		)
	}
}

export default ProductRouter;