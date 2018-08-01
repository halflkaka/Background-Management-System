import React from 'react';


class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchType : 'productId',
			searchKeyword : ''
		};
	}
	onValueChange(e){
		let name = e.target.name,
			value = e.target.value.trim();
		this.setState({
			[name] : value
		});
	}
	onSearch(){
		this.props.onSearch(this.state.searchType, this.state.searchKeyword);
	}
	onSearchKeywordKeyUp(e){
		if (e.keyCode === 13) {
			this.onSearch();
		}
	}
	render(){
		return (
				<div className="row search-wrap">
					<div className="col-md-12">
						<div className="form-inline">
							  <div className="form-group">
								<select className="form-control"
									name="searchType"
									onChange = {(e) => this.onValueChange(e)}>
									<option value="productId">Search by product Id</option>
									<option value="productName">Search by product name</option>
								</select>
							  </div>
							  <div className="form-group">
							    <input type="text" className="form-control" id="exampleInputPassword3" 
							    	placeholder="Key word" 
							    	name="searchKeyword"
							    	onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
							    	onChange = {(e) => this.onValueChange(e)}/>
							  </div>
							  <button className="btn btn-primary"
							  	onClick={e => this.onSearch()}>Search</button>
							</div>
					</div>
				</div>
		)
	}
}

export default ListSearch;