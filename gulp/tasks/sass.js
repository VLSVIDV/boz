'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	// СТИЛИ
	csso = require('gulp-csso'),
	cleanCSS = require('gulp-clean-css'),
	gcmq = require('gulp-group-css-media-queries'),
	notify = require('gulp-notify'),
	multipipe = require('multipipe');

var sourcemaps = require('gulp-sourcemaps');

module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			gulp.src(options.src),//берем сам main.less
			$.debug({title:'src'}),
			$.plumber({
				errorHandler: notify.onError(function(err){
					return{
						title: 'Sass plugin have error !',
						massage:err.massage
					};
				})
			}),
			// sourcemaps.init(),
			$.sass({
				includePaths: ['src/sass']
			}),
			$.autoprefixer({
				browsers: ['last 2 versions', '>1%'],
				cascade: false
			}),
			gcmq(),
			$.csscomb(),
			gulp.dest(options.dest),

			// cleanCSS({compatibility: 'ie8'}),
			csso({
				restructure: false,
				sourceMap: true,
				debug: true
			}),
			$.rename({
				extname: '.min.css'
			}),
			// sourcemaps.write('.'),
			gulp.dest(options.dest),

			$.debug({title:'dest'}),
			browserSync.reload({stream: true})

		).on('error', notify.onError());
	};

};