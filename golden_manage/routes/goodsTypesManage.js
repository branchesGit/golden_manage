var connect = require('../connect/connect');
var express = require('express');
var router = express.Router();
var getQueryConection = connect.getQueryConection;

/* GET GOODS TYPES LIST. */
router.get('/', function(req, res, next) {

	var susHandler = function( rows ){
		/*
			goodsTypeId: 9,
			goodsTypeName: '',
			superGoodsTypeId: null,
			cdate: ''
		*/

		var getSuperGoodsTypeName = function( superGoodsTypeId, rows ){
			var supeerGoodsTypeName = "";

			if( !superGoodsTypeId ){
				var idx = rows.findIndex(function( row, idx){
					return row.goodsTypeId === superGoodsTypeId;
				});

				idx !== -1 && ( supeerGoodsTypeName = row.goodsTypeName );
			}

			return supeerGoodsTypeName;
		};

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


router.get('/getSuperTypes', function(req,res,next){
	var cb = function( rows ){

	};


	//getQueryConection('');
})


//新增商品类型：
router.post('/incrementType', function(req,res,next){
	var postData = req.body;
	var typeID = postData.typeID;
	var goodsTypeName = postData.val;

	var successHandler = function( data ){
		//console.log( 'id', data.insertId );
		var goodsTypeID = data.insertId;
		var result = {goodsTypeID: goodsTypeID};
		result = JSON.stringify( result );
		res.send( result );
	};

	var errHandler = function( err ){
		res.send({"status": "fail"});
	}

	if( typeID == 1 ){
		var sql = "insert into goodstype set goodsTypeName ='" + goodsTypeName + "'";

		getQueryConection( sql, successHandler, errHandler ); 
	} else if( typeID == 2 ){
		var goodsTypeId = postData.goodsTypeId;

		var sql = "insert into goodstype set ? ",
		var insertData = {
			goodsTypeName: goodsTypeName,
			superGoodsTypeId: goodsTypId,
		};

		getQueryConection( sql, insertData, successHandler, errHandler ) 
	}
});


module.exports = router;
