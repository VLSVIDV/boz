'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	include = require('gulp-file-include'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	prettify = require('gulp-html-prettify'),
	debug = require('gulp-debug'),
	multipipe = require('multipipe');


module.exports = function(options) {

	return function() {
		return multipipe (
			gulp.src(options.src),
			$.plumber({
				errorHandler: notify.onError(function(err){
					return{
						title: 'html:include',
						massage:err.massage
					};
				})
			}),
			include({
				prefix: '@@',
				basepath: '@file'
			}),
			prettify({
				indent_char: '	',
				indent_size: 1
			}),
			$.debug({title:'html include done !'}),
			gulp.dest(options.dest)
		);
	};

};