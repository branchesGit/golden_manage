var connect = require('../connect/connect');

var express = require('express');
var router = express.Router();
var getQueryConection = connect.getQueryConection;

/* GET home page. */
router.get('/', function(req, res, next) {

	var cb = function( rows ){
		var result = JSON.stringify( rows );
		res.send( result );
	};

	getQueryConection( 'select * from t_user', cb );
});

module.exports = router;
