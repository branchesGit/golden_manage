var connect = require('../connect/connect');

var express = require('express');
var router = express.Router();
var getQueryConection = connect.getQueryConection;

/* GET home page. */
router.get('/', function(req, res, next) {

	var cb = function( rows ){
		var result = JSON.stringify( rows );
		res.send( result );
	},
	fail = function( err ){
		console.log( err );	
	};

	getQueryConection( 'select * from goods', cb, fail );
});

router.get('/getOriginGoods', function(req,res,next){
	var susHandler = function( rows ){

	},

	errHandler = function( err ){

	};

	var sql = 'select * from goods';
	
	getQueryConection( )

});

module.exports = router;
