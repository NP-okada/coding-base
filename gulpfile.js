// モジュール読み込み
const browserSync = require('browser-sync').create();
const del = require('del');
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const data = require('gulp-data');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const pkg = require('./package.json');


// 定数定義
const mode = 'development'; // production or development
const src = {
	pug: ['src/**/*.pug', '!src/**/_*.pug'],
	scss: 'src/assets/scss/*.scss',
	js: 'src/assets/js/**/*.js',
	js_copy: ['src/assets/js/jquery-2.2.4.min.js'],
	js_vendor: 'src/assets/js/vendor/*.js',
	images: 'src/**/images/**',
};
const dist = {
	css: 'dist/assets/css',
	js: 'dist/assets/js',
	images: 'dist/**/images/**',
};
const errorHandlerFunc = notify.onError({
	message: 'Error: <%= error.message %>',
	icon: path.join(__dirname, 'error.png')
});


// タスク定義
gulp.task('serve', () => {
	browserSync.init({
		server: './'
	});
	gulp.watch(src.pug, ['pug']);
	gulp.watch(src.scss, ['sass']);
	gulp.watch(src.js, ['js:fns']);
	gulp.watch(src.js_copy, ['js:copy']);
	gulp.watch(src.js_vendor, ['js:vendor']);
	gulp.watch(src.images + '/*.{png,jpg}', ['image:copy']);
});

gulp.task('pug', () => {
	var locals = {};
	return gulp.src(src.pug, {
			base: 'src'
		})
		.pipe(plumber({
			errorHandler: errorHandlerFunc
		}))
		.pipe(data(file => {
			locals.relPath = path.relative(file.base, file.path.replace(/.pug$/, '.html'));
			return locals;
		}))
		.pipe(pug({
			locals: locals,
			pretty: true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

gulp.task('sass', () => {
	return gulp.src(src.scss)
		.pipe(plumber({
			errorHandler: errorHandlerFunc
		}))
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
	return runSequence('js:copy', 'js:fns', 'js:vendor');
});
gulp.task('js:copy', () => {
	return gulp.src(src.js_copy)
		.pipe(gulp.dest(dist.js));
});
gulp.task('js:fns', () => {
	webpackConfig.mode = mode;
	webpackConfig.entry = './src/assets/js/entry.js';
	webpackConfig.output = {
		filename: 'fns.js'
	};
	return webpackStream(webpackConfig, webpack)
		.pipe(plumber({
			errorHandler: errorHandlerFunc
		}))
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.stream());
});
gulp.task('js:vendor', () => {
	return gulp.src(src.js_vendor)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(dist.js));
});

gulp.task('image:copy', () => {
	return gulp.src(src.images, {
			base: 'src'
		})
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});
gulp.task('image:del', () => {
	return del(dist.images);
});
gulp.task('image', () => {
	return runSequence('image:del', 'image:copy');
});

gulp.task('build', () => {
	return runSequence('pug', 'sass', 'js', 'image');
});

gulp.task('default', ['serve']);
