var connect = require('../connect/connect');
var express = require('express');
var router = express.Router();
var getQueryConection = connect.getQueryConection;


var getSuperGoodsTypeName = function( superGoodsTypeId, rows ){
	var superGoodsTypeName = "";

	if( superGoodsTypeId ){
		var idx = rows.findIndex(function( row, idx){
			return row.goodsTypeId === superGoodsTypeId;
		});
		
		idx !== -1 && ( superGoodsTypeName = rows[idx].goodsTypeName );
	}

	return superGoodsTypeName;
};

/* GET GOODS TYPES LIST. */
router.get('/', function(req, res, next) {

	var susHandler = function( rows ){
		/*
			goodsTypeId: 9,
			goodsTypeName: '',
			superGoodsTypeId: null,
			cdate: ''
		*/

		var len = rows && rows.length || 0;

		if( len )
		{
			rows.map(function( row, idx){
				row.superGoodsTypeName = getSuperGoodsTypeName( row.superGoodsTypeId, rows );
			})
		}

		res.send( rows );
	};

	var errHandle = function( err ){
		res.send({status: 'fail', code: -1 });
	};

	getQueryConection( 'select goodsTypeId, goodsTypeName, superGoodsTypeId, cdate from goodstype', susHandler, errHandle );	
});


//查询出super.商品类
router.get('/getSuperTypes', function(req,res,next){
	var susHandler = function( rows ){

		var len = rows && rows.length || null;
		var goodsTypeMap = {};

		if( len ){
			rows.map(function( row,idx )
			{
				if( !row.superGoodsTypeId ){
					goodsTypeMap[ row.goodsTypeId ] = {
						goodsTypeId: row.goodsTypeId,
						goodsTypeName: row.goodsTypeName	
					};

				} else {
					goodsTypeMap[ row.superGoodsTypeId ] = {
						goodsTypeId: row.superGoodsTypeId,
						goodsTypeName: getSuperGoodsTypeName( row.superGoodsTypeId, rows )
					};
				}
			});
		}

		var list = [];

		for( var name in goodsTypeMap ){
			list.push( goodsTypeMap[name] );
		}

		res.send( list );
	},

	errHandler = function( err ){

	};

	var sql = 'select superGoodsTypeId,goodsTypeName, goodsTypeId from goodstype';
	
	getQueryConection(sql, susHandler, errHandler );

});


//新增商品类型：
router.post('/incrementType', function(req,res,next){
	var postData = req.body;
	var superGoodsTypeId = postData.superGoodsTypeId;
	var goodsTypeName = postData.goodsTypeName;

	var successHandler = function( data ){
		var goodsTypeId = data.insertId;
		var result = {goodsTypeId: goodsTypeId, goodsTypeName: goodsTypeName };
		res.send( result );
	};

	var errHandler = function( err ){
		res.send({"status": "fail"});
	}

	if( !superGoodsTypeId ){
		var sql = "insert into goodstype set goodsTypeName ='" + goodsTypeName + "'";
		getQueryConection( sql, successHandler, errHandler ); 
	} else if( superGoodsTypeId ){

		var sql = "insert into goodstype set ? ";
		var insertData = {
			goodsTypeName: goodsTypeName,
			superGoodsTypeId: superGoodsTypeId,
		};

		getQueryConection( sql, insertData, successHandler, errHandler ) 
	}
});


//通过父ID来查询子ID的工具方法：
var getSubGoodsTypeList = function( superGoodsTypeId, goodsTypeList, ary ){
	var len = goodsTypeList && goodsTypeList.length || 0;
	ary.push( superGoodsTypeId );

	if( len ){
		goodsTypeList.map(function(goodsType,idx){
			if( goodsType.superGoodsTypeId == superGoodsTypeId ){
				getSubGoodsTypeList( goodsType.goodsTypeId, goodsTypeList, ary );
			}
		});	
	}
}

//删除商品类型：
router.post('/deleteGoodsType', function( req, res, next){
	var postData = req.body;
	var goodsTypeId = postData.goodsTypeId;

	//删除商品时，要把子类目也要删除掉...
	//var sql = "delete from goodstype where goodsTypeId = '" + goodsTypeId + "'"
	var sql = 'select * from goodstype';

	var susHandler = function( rows ){
		//console.log( data );
		var ary = [];
		getSubGoodsTypeList( goodsTypeId, rows, ary );

		var goodsTypeIds = ary.join(',');
		var sql = 'delete from goodstype where goodsTypeId in( ' + goodsTypeIds + " )";

		var susCb = function( data ){
			res.send({status:"success", code: 0})

		},
		errCb = function( data ){
			res.send({status:"fail", code: -1})
		};

		getQueryConection( sql, susCb, errCb );
	},

	errHandler = function( err ){

	};

	getQueryConection( sql, susHandler, errHandler );

});

//编辑商品的处理： 只能编辑就名称：
router.post('/editGoodsType', function(req,res,next){
	var postData = req.body;
	var goodsTypeId = postData.goodsTypeId;
	var goodsTypeName = postData.goodsTypeName;

	var susHandler = function( data ){
		res.send({status:'success', code: 0});
	};

	var errHandler = function( err ){
		res.send({"status": "fail", code: -1});
	};

	var sql = "update goodstype set goodsTypeName = '" + goodsTypeName + "' where goodsTypeId = '" + goodsTypeId + "'";
	getQueryConection( sql, susHandler, errHandler );
	
});


module.exports = router;
