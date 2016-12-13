var connect = require('../connect/connect');
var getQueryConection = connect.getQueryConection;

function getGoodsTypes( cb ){
	var susHandler = function( rows ){
		cb( rows );
	};
	var errHandle = function( err ){

	};

	var sql = 'select * from goodstype';
	getQueryConection( sql, susHandler, errHandle );
}

module.exports = {
	getGoodsTypes
}