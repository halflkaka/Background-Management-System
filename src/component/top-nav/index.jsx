import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();


class TopNav extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            username : _mm.getStorage('userInfo').username || ''
        }
	}
    onLogOut() {
        _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            window.location.href = '/login';
        }, err => {
            _mm.errorTips(err);
        })
    }
	render(){
		return (
			<div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL </Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;" >
                        <i className="fa fa-user fa-fw"></i> 
                        {
                            this.state.username?
                            <span>Welcom {this.state.username}</span> :
                            <span>Welcom User</span> 
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={() => {this.onLogOut()}}>
                                <i className="fa fa-sign-out fa-fw"></i> 
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
		)
	}
}

export default TopNav;