import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User {
	login(loginInfo) {
		return  _mm.request({
			type : 'post',
			url : '/manage/user/login.do',
			data : loginInfo
		})
	}
	logout() {
		return _mm.request({
			type: 'post',
			url: '/user/logout.do'
		})
	}
	checkLoginInfo(loginInfo){
		let username = $.trim(loginInfo.username);
		let password = $.trim(loginInfo.password);
		if (typeof username !== 'string' || username.length === 0) {
			return {
				status: false,
				msg: 'Username is null'
			};
		}
		if (typeof password !== 'string' || password.length === 0) {
			return {
				status: false,
				msg: 'Password is null'
			};
		}
		return {
			status: true,
			msg: 'Verified'
		};
	}
}

export default User;