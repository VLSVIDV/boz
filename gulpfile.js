'use strict';

// ////////////////////////////////////////////////
//
// GULP СБОРКА ДЛЯ ВЕРСТКИ САЙТОВ
//
// // /////////////////////////////////////////////

/*----------------------------------------
	PLUGINS
----------------------------------------*/

var gulp = require('gulp'),
	// РАБОТАЕМ С ПРОИЗВОДИТЕЛЬНОСТЬЮ СБОРКИ
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	gulpIf = require('gulp-if'),

	//sprite png files
	spritesmith = require('gulp.spritesmith'),

	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	plumber = require('gulp-plumber');

/*----------------------------------------
	PATHS / ПУТИ К ФАЙЛАМ
----------------------------------------*/
var paths = require('./gulp/paths');
console.log($);

// ПОДКЛЮЧАЕМ ОТДЕЛЬНО TASKS
function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
	var task = require(path).call(this, options);

	return task(callback);
	});
}

/*----------------------------------------
	BROWSER SYNC
----------------------------------------*/

gulp.task('server', ['sass', 'pug'], function() {
	browserSync.init({
		server: "./build",
		port: 4400
	});
});

gulp.task('watch-pug', ['pug'], function () {//pug or html
	browserSync.reload();
});

gulp.task('watch-js', ['js'], function () {
	browserSync.reload();
});

/*----------------------------------------
	HTML
----------------------------------------*/


lazyRequireTask('html', './gulp/tasks/html', {
	src: paths.html.src,
	dest: paths.html.dest
});


/*----------------------------------------
	PUG
----------------------------------------*/
lazyRequireTask('pug', './gulp/tasks/pug', {
	src: 'src/pug/*.pug',
	dest: paths.html.dest
});

// var versionConfig = {
// 	'value': '%MDS%',
// 	'append': {
// 	  'key': 'v',
// 	  'to': ['css', 'js'],
// 	},
// };

// gulp.task('version', () => {
// 	return gulp.src('build/*.html')
// 	.pipe($.versionNumber(versionConfig))
// 	.pipe(gulp.dest('build/'));
// });

/*----------------------------------------
	STYLES
----------------------------------------*/
//sass
lazyRequireTask('sass', './gulp/tasks/sass', {
	src: 'src/sass/app.scss',
	dest: paths.sass.dest
});


/*----------------------------------------
	JS
----------------------------------------*/

lazyRequireTask('js', './gulp/tasks/js', {
	src: paths.js.app,
	dest: paths.js.dest,
	minDest: paths.js.dest
});


//minify js files
// lazyRequireTask('js:min', './gulp/tasks/minjs', {
// 	src: paths.js.minSrc,
// 	dest: paths.js.minDest
// });


/*----------------------------------------
	SVG
----------------------------------------*/

//SVG SPRITE
lazyRequireTask('svg', './gulp/tasks/svg', {
	src: paths.svg.src,
});


//SVG SPRITE BASE 64
lazyRequireTask('svg:base', './gulp/tasks/svgBase', {
	src: paths.base64.src,
	dest: paths.base64.dest
});

/*----------------------------------------
	SPRITE PNG FILES
----------------------------------------*/
gulp.task('sprite', function () {
	var spriteData = gulp.src('src/images/sprite/*')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			// retinaImgName: 'sprite@2x.png',
			cssName: '_sprite-png.scss',
			imgPath:'../images/sprite/sprite.png',
			padding: 15
		})
	);

var imgStream = spriteData.img
	.pipe(gulp.dest('build/images/sprite'));

var cssStream = spriteData.css
	.pipe(gulp.dest('src/sass/sprite/'));

});


gulp.task('jsMinSync', function () {
	return gulp.src('src/js/minifier/**/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('build/js/'))
		.pipe(browserSync.stream());
});

/*----------------------------------------
	MINIFY IMAGES
----------------------------------------*/

lazyRequireTask('image:min', './gulp/tasks/images', {
	src: paths.images.src,
	dest: paths.images.dest
});


/*----------------------------------------
	MINIFY IMAGES in UPLOADS
----------------------------------------*/

lazyRequireTask('uploads:min', './gulp/tasks/images', {
	src: 'src/uploads/*',
	dest: './build/uploads/'
});

gulp.task('copy', function () {
	return gulp.src('src/files/**/*')
		.pipe(gulp.dest('build/'))
});


gulp.task('watch', function () {
		// sass
	gulp.watch('src/sass/**/*.scss', ['sass']);
	// html
	// gulp.watch(['src/html/**/*.html'], ['watch-html']);
	gulp.watch(['src/pug/**/*.pug'], ['watch-pug']);
	// js
	gulp.watch("src/js/**/*.js", ['watch-js']);
	// images
	gulp.watch("src/images/*", ['image:min']);
	gulp.watch("src/uploads/*", ['uploads:min']);
	// svg
	gulp.watch('src/svg/*.svg', ['svg']).on('change', function(event){
		if (event.type === 'deleted') {
			$.remember.forget('svg', event.path);
		}
	});
	gulp.watch('src/svg/**/*.svg', ['svg:base']);
	// png
	gulp.watch('src/images/sprite/*.png', ['sprite']);
});


/*----------------------------------------
	ZIP FILES
----------------------------------------*/
lazyRequireTask('zip', './gulp/tasks/zip', {
	src: paths.allDev,
	dest: paths.tempDir
});

/*----------------------------------------
	FTP
----------------------------------------*/
lazyRequireTask('ftp', './gulp/tasks/ftp', {
	src: paths.allDev
});



gulp.task('default', ['js','svg','server','watch']);

gulp.task('build', ['copy','js','svg', 'pug', 'sass', 'svg:base', 'image:min', 'uploads:min']);
