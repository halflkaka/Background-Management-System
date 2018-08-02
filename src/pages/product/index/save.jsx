import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CagtegorySelector from './category-selector.jsx';

const _mm = new MUtil();
const _product = new Product();


class ProductSave extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			categoryId : 0,
			parentCategoryId : 0
		};
	}
	onCategoryChange(categoryId, parentCategoryId){
		
	}
	render(){
		return (
				<div id="page-wrapper">
					<PageTitle title="Add product"/>
					<form className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">Name</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="Input product name"/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Description</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" placeholder="Input description"/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Cagtegory</label>
					    <CagtegorySelector onCategoryChange={
					    	(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Price</label>
					    <div className="col-md-3">
						    <div className="input-group">
							  <input type="number" className="form-control" placeholder="Price"/>
							  <span className="input-group-addon">$</span>
							</div>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Storage</label>
					    <div className="col-md-3">
							<div className="input-group">
							  <input type="number" className="form-control" placeholder="Storage"/>
							  <span className="input-group-addon">items</span>
							</div>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Picture</label>
					    <div className="col-md-10">
						    xxx
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Details</label>
					    <div className="col-md-10">
						    xxx
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-sm-offset-2 col-sm-10">
					      <button className="btn btn-default">Submit</button>
					    </div>
					  </div>
					</form>
				</div>
		)
	}
}

export default ProductSave;