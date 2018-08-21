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
	getProduct(productId){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/detail.do',
            data    : {
                productId : productId || 0
            }
        });
    }
	checkProduct(product){
		let result = {
			status: true,
			msg:'Verified successfully'
		};
		if (typeof product.name !== 'string' || product.name.length === 0) {
			return {
				status: false,
				msg: 'Name can not be null'
			};
		}
		if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
			return {
				status: false,
				msg: 'Subtitle can not be null'
			};
		}
		if (typeof product.price !== 'number' || !(product.price >= 0)) {
			return {
				status: false,
				msg: 'Price must be a positive number'
			};
		}
		if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
			return {
				status: false,
				msg: 'Stock must be a positive number'
			};
		}
		if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
			return {
				status: false,
				msg: 'Please choose a category'
			};
		}
		return result;
	}
	saveProduct(product){
		return  _mm.request({
			type : 'post',
			url : '/manage/product/save.do',
			data : product
		});
	}
	setProductStatus(productInfo){
		return  _mm.request({
			type : 'post',
			url : '/manage/product/set_sale_status.do',
			data : productInfo
		});
	}
	getCategoryList(parentCategoryId){
		return  _mm.request({
			type : 'post',
			url : '/manage/category/get_category.do',
			data : {
				categoryId : parentCategoryId
			}
		}); 
	}
	
}

export default Product;