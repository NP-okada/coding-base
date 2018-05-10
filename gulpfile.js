// モジュール読み込み
const browserSync = require('browser-sync').create();
const del = require('del');
const path = require('path');
const gulp = require('gulp');
const gulpData = require('gulp-data');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const pkg = require('./package.json');


// 変数定義
const errorHandler = notify.onError({
	message: 'Error: <%= error.message %>',
	icon: path.join(__dirname, 'error.png')
});
const src = {
	pug: ['src/**/*.pug', '!' + 'src/**/_*.pug'],
	scss: 'src/assets/scss/*.scss',
	images: ['src/**/images/**'],
};
const dist = {
	css: 'dist/assets/css',
	js: 'dist/assets/js',
};


// タスク定義
gulp.task('serve', ['pug', 'sass', 'js'], () => {
	browserSync.init({
		server: './'
	});
	gulp.watch(src.pug, ['pug']);
	gulp.watch(src.scss, ['sass']);
	gulp.watch(webpackConfig.entry, ['js']);
	gulp.watch(src.images, ['copy-image']);
});

gulp.task('pug', function() {
	var locals = {};
	return gulp.src(src.pug, {
			base: 'src'
		})
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(gulpData(file => {
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
			errorHandler: errorHandler
		}))
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
	return webpackStream(webpackConfig, webpack)
		.pipe(plumber({
			errorHandler: errorHandler
		}))
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.stream());
});

gulp.task('copy-image', () => {
	return gulp.src(src.images, {
			base: 'src'
		})
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});
gulp.task('del-image', () => {
	return del(['dist/**/images/**']);
});
gulp.task('clean-image', () => {
	return runSequence('del-image', 'copy-image');
});

gulp.task('default', ['serve']);
