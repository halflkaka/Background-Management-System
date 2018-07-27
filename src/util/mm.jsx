class MUtil{
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type: param.type || 'get',
				url: param.url || '',
				dataType: param.dataType || 'json',
				data: param.data || null,
				success(res) {
					if (res.status === 0) {
						typeof resolve === 'function' && resolve(res.data, res.message);
					} else if (res.status === 10) {
						doLogin();
					} else {
						typeof reject === 'function' && reject(res.message || res.data);
					}
				},
				error(err) {
					typeof reject === 'function' && reject(err.statusText);
				}
			});
		});
		
	}
	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	getUrlParam(name) {
		// param=123&param=456
		let queryString = window.location.search.split('?')[1] || '';
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let result = queryString.match(reg);
		return result? decodeURIComponent(result[2]) : null; 
	}
	errorTips(msg) {
		alert(msg || 'Error!');
	}
	setStorage(name, data) {
		let dataType = typeof data;
		if (dataType === 'object') {
			window.localStorage.setItem(name, JSON.stringify(data));
		} else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
			window.localStorage.setItem(name, data);
		} else {
			alert('Type is not supported for localStorage');
		}
	}
	getStorage(name) {
		let data = window.localStorage.getItem(name);
		if (data) {
			return JSON.parse(data);
		} else {
			return '';
		}
	}
	removeStorage(name) {
		window.localStorage.removeItem(name);
	}
}

export default MUtil;