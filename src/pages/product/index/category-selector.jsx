import React from 'react';

//page
import ProductList from 'pages/product/index/index.jsx';
import ProductSave from 'pages/product/index/save.jsx';

import './category-selector.scss';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();


class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstCategoryList : [],
			firstCategoryId : 0,
			secondCategoryList: [],
			secondCategoryId : 0
		};
	}
	componentDidMount(){
		this.loadFirstCategory();
	}
	loadFirstCategory(){
		_product.getCategoryList().then(res => {
			this.setState({
				firstCategoryList : res
			});
		}, err => {
			_mm.errorTips(err);
		}); 
	}
	loadSecondCategory(){
		_product.getCategoryList(this.state.firstCategoryId).then(res => {
			this.setState({
				secondCategoryList : res
			});
		}, err => {
			_mm.errorTips(err);
		}); 
	}
	onFirstCategoryChange(e){
		let newValue = e.target.value || 0;
		this.setState({
			firstCategoryId : newValue,
			secondCategoryId : 0,
			secondCategoryList : []
		}, () => {
			this.loadSecondCategory();
			this.onPropsCategoryChange();
		});
	}
	onSecondCategoryChange(e){
		let newValue = e.target.value || 0;
		this.setState({
			secondCategoryId : newValue
		}, () => {
			this.onPropsCategoryChange();
		});
	}
	onPropsCategoryChange(){
		let categoryChangeable = typeof this.props.onCategoryChange === 'function';
		if (this.state.secondCategoryId){
			categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
		} else {
			categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
		}
	}
	render(){
		return (
				<div className="col-md-10">
					<select className="form-control cate-select" onChange={(e)=>this.onFirstCategoryChange(e)}>
						<option value="">1st category</option>
						{
							this.state.firstCategoryList.map(
								(category,index)=><option value={category.id} key={index}>{category.name}</option>
							)
						}
					</select>
					{this.state.secondCategoryList.length ? 
						(<select name="" className="form-control cate-select" onChange={(e)=>this.onSecondCategoryChange(e)}>
							<option value="">2nd category</option>
							{
								this.state.secondCategoryList.map(
									(category,index)=><option value={category.id} key={index}>{category.name}</option>
								)
							}
						</select>) : null}
				</div>
		)
	}
}

export default CategorySelector;