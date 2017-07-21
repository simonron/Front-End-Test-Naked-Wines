// Gulpfile
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	coffee = require('gulp-coffee'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	pug = require('gulp-pug'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	tinylr = require('tiny-lr'),
	express = require('express'),
	app = express(),
	marked = require('marked'),
	path = require('path'),
	neat = require('node-neat').includePaths,
	server = tinylr(),
	//sourcemaps = require('gulp-sourcemaps'),
	includePaths = require('normalize-path').includePaths,
	coffeeSources = ['scripts/hello.coffee'],
	jsSources = ['scripts/*.js'],
	sassSources = ['styles/*.scss'],
	partialSources = ['partials/*.scss'],
	htmlSources = ['**/*.html'],
	outputDir = 'assets';


gulp.task('log', function () {
	gutil.log('== My First Task ==')
});

gulp.task('copy', function () {
	gulp.src('index.html')
		.pipe(gulp.dest(outputDir))
});

gulp.task('sass', function () {
	gulp.src(sassSources)
		// Initializes sourcemaps
		//.pipe(sourcemaps.init())
		.pipe(sass({
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(csso())
		// Writes sourcemaps into the CSS file
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets'))
		.pipe(connect.reload())
});

gulp.task('coffee', function () {
	gulp.src(coffeeSources)
		.pipe(coffee({
				bare: true
			})
			.on('error', gutil.log))
		.pipe(gulp.dest('scripts'))
});

gulp.task('js', function () {
	gulp.src(jsSources)
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload())
});
gulp.task('ie', function () {
	return gulp.src('src/assets/scripts/ie/*.js')
		.pipe(gulp.dest('dist/assets/js/ie/'))
		.pipe(livereload(server));
});

gulp.task('images', function () {
	return gulp.src('src/assets/images/**/*')
		.pipe(gulp.dest('dist/assets/images/'))
		.pipe(livereload(server));
});

gulp.task('fonts', function () {
	return gulp.src('src/assets/fonts/**/*')
		.pipe(gulp.dest('dist/assets/fonts/'))
		.pipe(livereload(server));
});

gulp.task('templates', function () {
	return gulp.src('src/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(livereload(server));
});

gulp.task('express', function () {
	app.use(express.static(path.resolve('./dist')));
	app.listen(1337);
	gutil.log('Listening on port: 1337');
});

gulp.task('watch', function () {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(partialSources, ['sass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function () {
	connect.server({
		root: '.',
		livereload: true
	})
});

gulp.task('html', function () {
	gulp.src(htmlSources)
		.pipe(connect.reload())
});

gulp.task('default', ['html', 'coffee', 'js', 'ie', 'images', 'fonts', 'templates', 'express', 'sass', 'connect', 'watch']);