import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CagtegorySelector from './category-selector.jsx';

import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';

const _mm = new MUtil();
const _product = new Product();


class ProductSave extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			subtitle: '',
			categoryId : 0,
			parentCategoryId : 0,
			subImages:[],
			price: '',
			stock: '',
			detail: '',
			status: 1
		};
	}
	onValueChange(e){
		let name = e.target.name;
		let value = e.target.value.trim();
		this.setState({
			[name]: value
		})
	}
	onCategoryChange(categoryId, parentCategoryId){
		this.setState({
			categoryId: categoryId,
			parentCategoryId: parentCategoryId
		});
	}
	onUploadSuccess(res){
		let subImages = this.state.subImages;
		subImages.push(res);
		this.setState({
			subImages: subImages
		});
	}
	onUploadError(err){
		_mm.errorTips(err);
	}
	onImageDelete(e){
		let index = parseInt(e.target.getAttribute('index'));
		let subImages = this.state.subImages;
		subImages.splice(index, 1);
		this.setState({
			subImages : subImages
		});
	}
	onRichEditorChange(value){
		this.setState({
			detail: value
		});
	}
	getSubImagesString(){
		return this.state.subImages.map((image)=>image.uri).join();
	}
	onSubmit(e){
		let product = {
			name: this.state.name,
			subtitle: this.state.subtitle,
			price: parseFloat(this.state.price),
			detail: this.state.detail,
			stock: parseInt(this.state.stock),
			subImages: this.getSubImagesString(),
			categoryId: parseInt(this.state.categoryId),
			status: this.state.status
		};
		let productCheckResult = _product.checkProduct(product);
		if (productCheckResult.status) {
			_product.saveProduct(product).then((res)=>{
				_mm.successTips(res);
				this.props.history.push('/product/index');
			}, (err)=>{
				_mm.errorTips(err);
			})
		} else {
			_mm.errorTips(productCheckResult.msg);
		}
	}
	render(){
		return (
				<div id="page-wrapper">
					<PageTitle title="Add product"/>
					<div className="form-horizontal">
					  <div className="form-group">
					    <label className="col-md-2 control-label">Name</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" 
					      	placeholder="Input product name"
					      	name="name"
					      	onChange={(e) => this.onValueChange(e)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Description</label>
					    <div className="col-md-5">
					      <input type="text" className="form-control" 
					      	placeholder="Input description"
					      	name="subtitle"
					      	onChange={(e) => this.onValueChange(e)}/>
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
							  <input type="number" className="form-control" 
							  	placeholder="Price"
							  	name="price"
					      		onChange={(e) => this.onValueChange(e)}/>
							  <span className="input-group-addon">$</span>
							</div>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Storage</label>
					    <div className="col-md-3">
							<div className="input-group">
							  <input type="number" className="form-control" 
							  	placeholder="Storage"
							  	name="stock"
					      		onChange={(e) => this.onValueChange(e)}/>
							  <span className="input-group-addon">items</span>
							</div>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Picture</label>
					    <div className="col-md-10">
							{
						    	this.state.subImages.length? this.state.subImages.map(
									(image, index) => (
										<div className="img-con" key={index} >
											<img className="img" src={image.url}/>
											<i className="fa fa-close" index={index} onClick={(e)=>this.onImageDelete(e)}></i>
										</div>
									)
						    	) : (<div>Please upload photo</div>)
						    }
					    </div>
					    <div className="col-md-offset-2 col-md-10 file-upload-con">
						    <FileUploader onSuccess={(res)=>this.onUploadSuccess(res)} onError={(err)=>this.onUploadError(err)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label className="col-md-2 control-label">Details</label>
					    <div className="col-md-10">
						    <RichEditor onValueChange={(value)=>this.onRichEditorChange(value)}/>
					    </div>
					  </div>
					  <div className="form-group">
					    <div className="col-sm-offset-2 col-sm-10">
					      <button className="btn btn-primary" type="submit" onClick={(e)=>this.onSubmit(e)}>Submit</button>
					    </div>
					  </div>
					</div>
				</div>
		)
	}
}

export default ProductSave;