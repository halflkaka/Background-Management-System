import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {
	getProductList(listparam){
		let url = '', data = {};
		if(listparam.listType === 'list') {
			url = '/manage/product/list.do';
			data.pageNum = listparam.pageNum;
		} else if (listparam.listType === 'search'){
			url = '/manage/product/search.do';
			data.pageNum = listparam.pageNum;
			data[listparam.searchType] =listparam.keyword;
		}

		return  _mm.request({
			type : 'post',
			url : url,
			data : data
		});
	}
	setProductStatus(productInfo){
		return  _mm.request({
			type : 'post',
			url : '/manage/product/set_sale_status.do',
			data : productInfo
		});
	}
}

export default Product;