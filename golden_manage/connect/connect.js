var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'goodsstore',
	port: 3306
});


function getQueryConection( /*sql, cb, errHandle */){
	var idx = 0;
	var sql = arguments[ idx ];

	var susHandler = arguments[ ++idx ];
	var data;

	if( typeof susHandler !== 'function' )
	{
		data = susHandler;
		susHandler = arguments[ ++idx ];
	}

	var errHandler = arguments[ ++idx ];

	pool.getConnection(function(err,connection){

		if( data ){
			connection.query( sql, data, function( err, rows ){
				if( err ){
					errHandle && errHandle( err );	
				} else {
					//处理查询出来的结果
					susHandler( rows );
					connection.release();
				}
			})
		} else {
			connection.query( sql, function( err, rows ){
				if( err ){
					errHandle && errHandle( err );	
				} else {
					//处理查询出来的结果
					susHandler( rows );
					connection.release();
				}
			})
		}
		
	})
}


module.exports = {
	getQueryConection
};