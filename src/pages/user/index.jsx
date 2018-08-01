import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.jsx';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			list : [],
			pageNum : 1
		};
	}
	componentDidMount(){
		this.loadUserList();
	}
	loadUserList(){
		_user.getUserList(this.state.pageNum).then(res => {
			this.setState(res);
		}, err => {
			_mm.errorTips(err);
		});
	}
	onPageNumChange(pageNum){
		this.setState({
			pageNum: pageNum
		}, () => {
			this.loadUserList();
		})
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="User List"/>
				<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-boarder">
							<thead>
								<tr>
									<th>ID</th>
									<th>Username</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Register Time</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.list.map((user, index) => {
										return (
											<tr key={index}>
												<td>{user.id}</td>
												<td>{user.username}</td>
												<td>{user.email}</td>
												<td>{user.phone}</td>
												<td>{new Date(user.createTime).toLocaleString()}</td>
											</tr>
										);
									})
								}
								
							</tbody>
						</table>
					</div>
				</div>
				<Pagination current={this.state.pageNum} 
					total={this.state.total} 
					onChange={pageNum => {this.onPageNumChange(pageNum);}}/>
			</div>
		);
	}
}

export default UserList;
