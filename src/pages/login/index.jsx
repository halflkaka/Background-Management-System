import React from 'react';
import './index.scss';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('redirect') || '/'
		};
	}
	componentWillMount(){
		document.title = 'Login - MMALL ADMIN';
	}
	onInputChange(e){
		let targetName = e.target.name;
		let targetValue = e.target.value;
		this.setState({
			[targetName]: targetValue
		});
	}
	onInputKeyUp(e){
		if (e.keyCode === 13) {
			this.onSubmit();
		}
	}
	onSubmit(){
		let loginInfo = {
			username: this.state.username,
			password: this.state.password,
		}, 
		checkResult = _user.checkLoginInfo(loginInfo);
		if (checkResult.status) {
			_user.login(loginInfo).then((res) => {
				_mm.setStorage('userInfo', res);
				this.props.history.push(this.state.redirect);
			}, (err) => {
				_mm.errorTips(err);
			});
		} else {
			_mm.errorTips(checkResult.msg);
		}
	}
	render(){
		return (
				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default login-panel">
					  <div className="panel-heading">Welcome Login</div>
					  <div className="panel-body">
					    <div>
						  <div className="form-group">
						    <input type="text" 
						    	className="form-control" 
						    	name="username" 
						    	placeholder="Username" 
						    	onKeyUp={e=>this.onInputKeyUp(e)}
						    	onChange={e=>this.onInputChange(e)}/>
						  </div>
						  <div className="form-group">
						    <input type="password" 
						    	className="form-control"
						    	name="password" 
						    	placeholder="Password" 
						    	onKeyUp={e=>this.onInputKeyUp(e)}
						    	onChange={e=>this.onInputChange(e)}/>
						  </div>
						  <button className="btn btn-primary btn-lg btn-block"
						  		onClick={e=>{this.onSubmit(e)}}>Login</button>
						</div>
					  </div>
					</div>
				</div>	
		);
	}
}

export default Login;
