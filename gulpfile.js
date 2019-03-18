// モジュール読み込み
const browserSync = require('browser-sync').create();
const del = require('del');
const path = require('path');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cached = require('gulp-cached');
const concat = require('gulp-concat');
const data = require('gulp-data');
const filter = require('gulp-filter');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const progeny = require('gulp-progeny');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const pkg = require('./package.json');


// fetch command line arguments
const arg = (argList => {
	var arg = {}, a, opt, thisOpt, curOpt;
	for (a = 0; a < argList.length; a++) {
		thisOpt = argList[a].trim();
		opt = thisOpt.replace(/^\-+/, '');
		if (opt === thisOpt) {
			// argument value
			if (curOpt) arg[curOpt] = opt;
			curOpt = null;
		}
		else {
			// argument name
			curOpt = opt;
			arg[curOpt] = true;
		}
	}
	return arg;
})(process.argv);


// 定数・変数定義
const src = {
	pug: ['src/**/*.pug'],
	scss: 'src/assets/scss/**/*.scss',
	js_entry: 'src/assets/js/entry.js',
	js_import: 'src/assets/js/import/*.js',
	js_vendor: 'src/assets/js/vendor/*.js',
	images: ['src/**/*images/**/*.*'],
	copy: [
		'src/assets/js/jquery-2.2.4.min.js',
	],
};
const dist = {
	css: 'dist/assets/css',
	js: 'dist/assets/js',
	images: ['dist/**/*images/**/*.*'],
};
const errorHandlerFunc = notify.onError({
	message: 'Error: <%= error.message %>',
	icon: path.join(__dirname, 'error.png')
});
var mode = 'development'; // production or development


// refer command line arguments
if (arg.mode === 'prod') mode = 'production';


// タスク定義
gulp.task('serve', () => {
	browserSync.init({
		server: './'
	});
	gulp.watch(src.pug, gulp.task('pug'));
	gulp.watch(src.scss, gulp.task('sass'));
	gulp.watch([src.js_entry, src.js_import], gulp.task('js:bundle'));
	gulp.watch(src.js_vendor, gulp.task('js:vendor'));
	gulp.watch(src.images, gulp.task('image:copy'));
	gulp.watch(src.copy, gulp.task('copy'));
});

gulp.task('pug', (cb) => {
	var f = filter(['**', '!**/include_pug/**/*']);
	var locals = {};
	return gulp.src(src.pug, {
			base: 'src'
		})
		.pipe(plumber({
			errorHandler: errorHandlerFunc
		}))
		.pipe(cached('pug'))
		.pipe(progeny())
		.pipe(data(file => {
			locals.relPath = path.relative(file.base, file.path.replace(/.pug$/, '.html'));
			return locals;
		}))
		.pipe(pug({
			locals: locals,
			pretty: true
		}))
		.pipe(f)
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
	cb();
});

gulp.task('sass', (cb) => {
	return gulp.src(src.scss)
		.pipe(plumber({
			errorHandler: errorHandlerFunc
		}))
		.pipe(cached('sass'))
		.pipe(progeny())
		.pipe(sassGlob())
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(dist.css))
		.pipe(browserSync.stream());
	cb();
});

webpackConfig.mode = mode;
webpackConfig.entry = './' + src.js_entry;
webpackConfig.output = {
	filename: 'bundle.js'
};
gulp.task('js:bundle', (cb) => {
	return webpackStream(webpackConfig, webpack)
		.on('error', () => {
			this.emit('end');
		})
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.stream());
	cb();
});
gulp.task('js:vendor', (cb) => {
	return gulp.src(src.js_vendor)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(dist.js));
	cb();
});
gulp.task('js', gulp.parallel('js:bundle', 'js:vendor'));

gulp.task('image:copy', (cb) => {
	return gulp.src(src.images, {
			base: 'src'
		})
		.pipe(newer('dist'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
	cb();
});
gulp.task('image:del', (cb) => {
	return del(dist.images);
	cb();
});
gulp.task('image', gulp.series('image:del', 'image:copy'));

gulp.task('copy', (cb) => {
	return gulp.src(src.copy, {
			base: 'src'
		})
		.pipe(newer('dist'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
	cb();
});

gulp.task('build', gulp.parallel('pug', 'sass', 'js', 'image', 'copy'));

gulp.task('default', gulp.task('serve'));
