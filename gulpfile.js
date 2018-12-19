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
const runSequence = require('run-sequence');
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
var mode = 'development'; // production or development
const src = {
	pug: ['src/**/*.pug'],
	scss: 'src/assets/scss/**/*.scss',
	js_entry: 'src/assets/js/entry.js',
	js_import: 'src/assets/js/import/*.js',
	js_vendor: 'src/assets/js/vendor/*.js',
	images: ['src/**/*images/**/*.*'],
	copy: [
		'src/common/js/jquery-2.2.4.min.js',
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


// refer command line arguments
if (arg.mode === 'prod') mode = 'production';


// タスク定義
gulp.task('serve', () => {
	browserSync.init({
		server: './'
	});
	gulp.watch(src.pug, ['pug']);
	gulp.watch(src.scss, ['sass']);
	gulp.watch([src.js_entry, src.js_import], ['js:bundle']);
	gulp.watch(src.js_vendor, ['js:vendor']);
	gulp.watch(src.images, ['image:copy']);
	gulp.watch(src.copy, ['copy']);
});

gulp.task('pug', () => {
	var f = filter(['**', '!**/include_pug/*']);
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
});

gulp.task('sass', () => {
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
});

gulp.task('js', () => {
	return runSequence('js:bundle', 'js:vendor');
});
gulp.task('js:bundle', () => {
	webpackConfig.mode = mode;
	webpackConfig.entry = './' + src.js_entry;
	webpackConfig.output = {
		filename: 'bundle.js'
	};
	return webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.stream());
});
gulp.task('js:vendor', () => {
	return gulp.src(src.js_vendor)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(dist.js));
});

gulp.task('image', () => {
	return runSequence('image:del', 'image:copy');
});
gulp.task('image:copy', () => {
	return gulp.src(src.images, {
			base: 'src'
		})
		.pipe(newer('dist'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});
gulp.task('image:del', () => {
	return del(dist.images);
});

gulp.task('copy', () => {
	return gulp.src(src.copy, {
			base: 'src'
		})
		.pipe(newer('dist'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

gulp.task('build', () => {
	return runSequence('pug', 'sass', 'js', 'image', 'copy');
});

gulp.task('default', ['serve']);
