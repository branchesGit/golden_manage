var connect = require('../connect/connect');
var getQueryConection = connect.getQueryConection;
var goodsTypesUtil = require('./goodsTypesUtil');
//表的映射字段。
const GOODS_COLUMN_MAP = {
	"商品编码": 'goodsNO',
	"商品名称": 'goodsName',
	"商品类型": 'goodsTypeName',
	'重量(g)': 'goodsWeight',
	'工费(g)': 'unitFee',
	'进价': 'originPrice',
	"镶嵌工费": 'inlayFee'
};

var getGoodsTypes = goodsTypesUtil.getGoodsTypes;

var insertGoods = function insertGoods( row, goodsTypes ){	
	if( row ){
		var idx;
		var goods = {};

		for( var name in row ){
			if( name == "商品类型" ){
				var idx = goodsTypes.findIndex( function( goodsType,idx){
					return goodsType.goodsTypeName == row[ name ];
				});
			}

			goods[ GOODS_COLUMN_MAP[ name ] ] = row[ name ];
		}


		if( idx !== -1 ){
			var sql = 'insert into goods set ?';
			getQueryConection( sql, goods, function(){}, function(){});
		} else {
			console.log('not found goods type in system, please first add goods types');
		}
	}
};

//插入商品
var handleGoodsList = function( rows ){
	var len = rows && rows.length || 0;

	if( len ){

		var cb = function( goodsTypes ){
			rows.map(function(row,idx){
				insertGoods( row, goodsTypes );
			});	
		}

		getGoodsTypes( cb );
	}
};

module.exports = {
	handleGoodsList
};
