var srcDir = './src',
    tempDir = './temp',
    destDir = './build';

module.exports = {
    src: srcDir,
    dest: destDir,
    allDev:destDir + '**/*.*',
    temp: tempDir,
    html: {
        all: srcDir + '/html/**/*.html',
        src: srcDir + '/html/*.html',
        dest: destDir
    },
    js: {
        all: srcDir + '/js/**/*.js',
        src: srcDir + '/js/*.js',
        dest: destDir + '/js',
        app: srcDir + '/js/app.js',
        plugins: srcDir + '/js/plugins/**/*.js',
        minDest: destDir + '/js/min',
        minSrc: srcDir + '/js/minifier/**/*.js'
    },
    svg: {
        src: srcDir + '/svg/*.svg',
        dest: destDir + '/images/icons'
    },
    base64:{
        src: srcDir + '/svg/base/*.svg',
        dest: srcDir + '/sass/sprite/'
    },
    sprite: {
        src: srcDir + '/images/sprite/**/*.png',
        dest: destDir + '/images/icons'
    },
    sass: {
        all: [srcDir + '/sass/**/*.scss'],
        src: [srcDir + '/sass/*.scss'],
        dest: destDir + '/css',
        app: srcDir + '/sass/app.scss',
        plugins: srcDir + '/sass/plugins/**/*.scss'
    },
    images: {
        all: srcDir + '/images/**/*.{jpg,png,jpeg,JPEG}',
        src: srcDir + '/images/*',
        dest: destDir + '/images'
    }
};