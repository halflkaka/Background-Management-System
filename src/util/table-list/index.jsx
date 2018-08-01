import React from 'react';

class TableList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isFirstLoading : true
		}
	}
	componentWillReceiveProps(){
		this.setState({
			isFirstLoading : false
		})
	}
	render(){
		let tableHeader = this.props.tableHeads.map(
			(tableHead, index) => {
				if(typeof tableHead === 'object') {
					return <td key={index} width={tableHead.width}>{tableHead.name}</td>
				} else if (typeof tableHead === 'string') {
					return <td key={index}>{tableHead}</td>
				}
				
			}
		);
		let listBody = this.props.children;
		let listInfo = (
			<tr>
				<td colSpan={this.props.tableHeads.length} className="text-center">
					{this.state.isFirstLoading? 'loading...' : 'nothing to show'}
				</td>
			</tr>
		)
		let tableBody = listBody.length > 0 ? listBody : listInfo;
		return (
			<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-boarder">
							<thead>
								<tr>
									{tableHeader}
								</tr>
							</thead>
							<tbody>
								{tableBody}
							</tbody>
						</table>
					</div>
			</div>
		)
	}
}

export default TableList;