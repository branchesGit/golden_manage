var express = require('express');
var router = express.Router();
var xlsx = require('xlsx');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var deepAssign = require('deep-assign');
var goodsManageUtil = require('./goodsManageUtil');

/* GET home page. */
router.post('/', multipartMiddleware, function(req, res, next) {
  var file = req.files.file;

  if( file ){
  	var path = file.path;
  	//读取本地的工作表
	var workbook = xlsx.readFileSync(path);  
	//console.log( workbook );
	var sheetName = workbook.SheetNames[ 0 ];
	var sheet = workbook.Sheets[ sheetName ];	
	var colCount = 0;
	var maxRow = 0;

	var sheetVals = [];

	for( var name in sheet ){
		if( name[0] !== "!" ){
			sheetVals.push( sheet[ name].v  || "" );

			if( name[name.length - 1] == 1 ){
				colCount++;
			}

			maxRow = name[ name.length - 1];
		}
	}
	//取出列数：
	//console.log( colCount, maxRow );
	maxRow = parseInt( maxRow, 10 );
	var ary = [];
	var headNames = [];

	var cellName;
	var rowData;
	for( var idx = 0; idx < maxRow; idx++ ){	
		if( idx == 0 ){
			for( var colIdx = 0; colIdx < colCount; colIdx++ ){
				cellName = xlsx.utils.encode_cell({r: idx, c:colIdx});
				headNames[ colIdx ] = sheet[ cellName ].v;
			}
		} else {
			rowData = {};

			for( var colIdx = 0; colIdx < colCount; colIdx++ ){
				cellName = xlsx.utils.encode_cell({r: idx, c:colIdx});
				

				rowData[ headNames[ colIdx] ] = sheet[ cellName ] && sheet[ cellName ].v || "";		
			}		

			ary[ idx - 1 ] = deepAssign( {}, rowData );
		}
	}

	goodsManageUtil.handleGoodsList( ary );
  }

});

module.exports = router;
