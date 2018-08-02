import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import ListSearch from './index-list-search.jsx';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list : [],
			pageNum : 1,
			listType : 'list'
		};
	}
	componentDidMount(){
		this.loadProductList();
	}
	loadProductList(){
		let listParam = {
			pageNum : this.state.pageNum,
			listType : this.state.listType
		}
		if(this.state.listType === 'search') {
			listParam.searchType = this.state.searchType;
			listParam.keyword = this.state.searchKeyword;
		}
		_product.getProductList(listParam).then(res => {
			this.setState(res);
		}, err => {
			this.setState({
				list:[]
			})
			_mm.errorTips(err);
		});
	}
	onSearch(searchType, searchKeyword) {
		let listType = searchKeyword === ''? 'list' : 'search';
		this.setState({
			listType: listType,
			pageNum : 1,
			searchKeyword : searchKeyword,
			searchType : searchType
		}, ()=>{
			this.loadProductList();
		});
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadProductList();
		})
	}
	onSetProductStatus(e, status, id) {
		let newStatus = status == 1? 2 : 1,
			tips = status == 1? 'Sure to disable this item?' : 'Sure to enable this item?';
		if (window.confirm(tips)) {
			_product.setProductStatus({
				productId : id,
				status : newStatus
			}).then(res=>{
				_mm.successTips(res);
				this.loadProductList();
			}, err=>{
				_mm.errorTips(err);
			})
		}
	}
	render(){
		let tableHeads = [
			{name: 'ID', width:'10%'},
			{name: 'Info', width:'50%'},
			{name: 'Price', width:'10%'},
			{name: 'Status', width:'15%'},
			{name: 'Operation', width:'15%'}
		]
		return (
			<div id="page-wrapper">
				<PageTitle title="Product List">
					<div className="page-header-right">
						<Link to="/product/save" className="btn btn-primary">
							<i className="fa fa-plus"></i>
							<span>Add product</span>
						</Link>
					</div>
				</PageTitle>
				<ListSearch onSearch={(searchType, searchKeyword)=>this.onSearch(searchType, searchKeyword)}/>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((product, index) => {
							return (
								<tr key={index}>
									<td>{product.id}</td>
									<td>
										<p>{product.name}</p>
										<p>{product.subtitle}</p>
									</td>
									<td>$ {product.price}</td>
									<td>
									<p>{
										product.status == 1? 'Selling' : 'Unabled'
									}</p>
									<button className="btn btn-xs btn-warning" onClick={(e)=>{this.onSetProductStatus(e,product.status,product.id)}}>{product.status == 1? 'Disable' : 'Enable'}</button>
									</td>
									<td>
										<Link className="opear" to={`/product/detail/${product.id}`}>Details</Link>
										<Link className="opear" to={`/product/save/${product.id}`}>Edit</Link>
									</td>
								</tr>
							)
						})
					}
				</TableList>
				<Pagination current={this.state.pageNum} 
					total={this.state.total} 
					onChange={pageNum => {this.onPageNumChange(pageNum);}}/>
			</div>
		);
	}
}

export default ProductList;
