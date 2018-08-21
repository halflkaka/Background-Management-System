import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list : [],
			parentCategoryId : this.props.match.params.categoryId || 0
		};
	}
	componentDidMount(){
		this.loadCategoryList();
	}
	componentDidUpdate(prevProps, prevState){
		let oldPath = prevProps.location.pathname,
			newPath = this.props.location.pathname,
			newId = this.props.match.params.categoryId || 0;
		if (oldPath !== newPath){
			this.setState({
				parentCategoryId: newId
			}, ()=>{
				this.loadCategoryList();
			});
		}
	}
	loadCategoryList(){
		_product.getCategoryList(this.state.parentCategoryId).then(res => {
			this.setState({
				list:res
			});
		}, err => {
			_mm.errorTips(err);
		});
	}
	onUpdateName(categoryId, categoryName){
		let newName = window.prompt('Input new category name', categoryName);
		if(newName){
			_product.updateCategoryName({
				categoryId: categoryId,
				categoryName: newName
			}).then(res => {
				_mm.successTips(res);
				this.loadCategoryList();
			}, err => {
				_mm.errorTips(err);
			});
		}
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="Category List"/>
				<div className="row">
					<div className="col-md-12">
						<p>Parent Id: {this.state.parentCategoryId}</p>
						<table className="table table-striped table-boarder">
							<thead>
								<tr>
									<th>ID</th>
									<th>Categoryname</th>
									<th>Operation</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.list.map((category, index) => {
										return (
											<tr key={index}>
												<td>{category.id}</td>
												<td>{category.name}</td>
												<td>
													<a className="opear"
														onClick={(e) => this.onUpdateName(category.id, category.name)}>Modify Name</a>
													{
														category.parentId === 0 ?
														<Link to={`/product-category/index/${category.id}`}>Check child category</Link>
														: null
													}
												</td>
											</tr>
										);
									})
								}
								
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default CategoryList;
