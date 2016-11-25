var gulp = require("gulp");

var clean = require('gulp-clean');

var webpack = require('gulp-webpack');

var config = require('./webpack.config');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var uglify = require('gulp-uglify');


gulp.task('clean', function(){
	return gulp.src('./build/').pipe( clean() );
})


gulp.task( 'miniJS', ['clean'], function(){
	var stream = gulp.src('./src').pipe( webpack(config) )
				.pipe( gulp.dest('./build') );

	return stream;
});


gulp.task('reload_by_js', function(){
	gulp.run('miniJS', reload);
});


var JSPaths = ['./src/'];
gulp.task( 'server', ['miniJS'], function(){
	browserSync.init({
	server: {
		baseDir: "./"
	}
	});

	//修改html时，加载页面
	gulp.watch("*.html").on("change", reload);
	gulp.watch("./**/*.css").on("change", reload);
	gulp.watch( JSPaths, ['reload_by_js'] );
	
	var watcherJS = gulp.watch( './pages/**/*.js', ['reload_by_js'] );

	watcherJS.on('change', function(event){
		console.log('client JS have change, file path is ' + event.path );
	});
});

gulp.task('default', ['server'] );