var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'goodsstore',
	port: 13306
});


function getQueryConection( sql, cb ){
	pool.getConnection(function(err,connection){
		connection.query( sql, function( err, rows ){
			if( err ) throw err;
			//处理查询出来的结果
			cb( rows );
			connection.release();
		})
	})
}


module.exports = {
	getQueryConection
};