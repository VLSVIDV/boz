'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	gulpIf = require('gulp-if'),
	notify = require('gulp-notify'),
	multipipe = require('multipipe');


module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			$.newer('build/images/sprite/'),
			gulp.src(options.src),
			$.remember('svg'),
			svgmin({
				js2svg: {
					pretty: true
				}
			}),
			// remove all fill, style and stroke declarations in out shapes
			cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: {xmlMode: true}
			}),
			$.svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite.svg",
						render: {
							scss: {
								dest:"../_sprite.scss",
								template: "src/sass/sprite/_sprite_template.scss"
							}
						}
					}
				}
			}),
			$.debug({title:'svg'}),
			gulpIf('*.scss', gulp.dest('./src/sass/sprite'),gulp.dest('./build/images/sprite')
			),
			notify(" I maked svg sprite!")
		);
	};

};