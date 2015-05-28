var gulp = require('gulp');
var tscompile = require('gulp-typescript');
var replace = require('gulp-replace');
var jsx = require('react-tools');
var rename = require('gulp-rename');
var synchronous = require('run-sequence');

var path = {
	ROOT: './',
	TSX_FILES: './src/**/*.tsx',
	TS_FILES: './src/**/*.ts',
	TS_COMPILED: './build/**/*.ts',
	BUILD_OUT: './build/',	
	JS_OUT: './build/js_src/',
	UTILS: './utils/**/*.ts'
};

// TS Copy
gulp.task('ts-copy', function() {
	return gulp.src(path.TS_FILES)
	.pipe(gulp.dest(path.BUILD_OUT));	
});

// TSX Transform
gulp.task('tsx-transform', function() {
	return gulp.src(path.TSX_FILES)
	  .pipe(replace(/React\.jsx\(\s*?\/\*((.|[\r\n])*?)\*\/\s*?\)/gm, function (match, tsx) {
		return '('+ jsx.transform('/** @jsx React.DOM */' + tsx).slice(21) + ')';
	  })) // using multi-line comments
	  .pipe(replace(/React\.jsx\(\s*?`([^`\\\\]*(\\\\.[^`\\\\]*)*)`\s*?\)/gm, function (match, tsx) {
		return '('+ jsx.transform('/** @jsx React.DOM */' + tsx).slice(21) + ')';
	  })) // using template strings (TS v1.4+)
	  .pipe(replace(/\/\*jsx\*\/((.|[\r\n])*?)\/\*jsx\*\//gm, function (match, tsx) {
		return '('+ jsx.transform('/** @jsx React.DOM */' + tsx).slice(21) + ')';
	  })) // using /*jsx*/ {...} /*jsx*/
	  .pipe(rename(function(path){
		path.extname = '.ts';
	  }))
	  .pipe(gulp.dest(path.BUILD_OUT));
});

// TS Convert
gulp.task('ts-convert', function() {
	return gulp.src(path.TS_COMPILED)
	  .pipe(tscompile({
		  noImplicitAny: false,
		  outDir: path.JS_OUT,
		  target: 'ES5',
		  module: 'commonjs',
		  removeComments: true
	  }))
	  .pipe(gulp.dest(path.JS_OUT));
});

// Utils Copy
gulp.task('utils-copy', function() {
	return gulp.src(path.UTILS)
	.pipe(tscompile({
		  noImplicitAny: false,
		  target: 'ES5',
		  module: 'commonjs',
		  removeComments: true
	 }))
	.pipe(gulp.dest(path.JS_OUT + '/utils/'));
});

// Individual Build Tasks
gulp.task('build:ts', ['ts-copy', 'tsx-transform']);
gulp.task('build:js', ['utils-copy', 'ts-convert']);


// Browserify Tasks

var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
//var reactify = require('reactify'); 
// ^-- doesn't work with TS since we have our own "TSX" transform
//var tsify = require('tsify');
// ^-- not really useful since we want to have JS src in our project
//     so might as well bundle from converted JS  

path['HTML'] = './src/index.html',
path['MINIFY_OUT'] = 'build.min.js',
path['DIST_OUT'] = 'build.js',
path['DIST_SRC'] = './public/src/',
path['DIST_ROOT'] = './public/',
path['ENTRY'] = './build/js_src/build/app.js';

// HTML Copy
gulp.task('html-copy', function() {
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DIST_ROOT));
});

// HTML Replace <script src="...">
gulp.task('replaceHTML', function() {
	gulp.src(path.HTML)
	.pipe(htmlreplace({
		'js': './src/' + path.MINIFY_OUT
	}))
	.pipe(gulp.dest(path.DIST_ROOT));
});

// Watch
gulp.task('watch', function() {
	function callback() {
		gulp.watch(path.HTML, ['html-copy']);
		gulp.watch(path.UTILS, ['utils-copy']);
		gulp.watch(path.TS_FILES, ['ts-copy']);
		gulp.watch(path.TSX_FILES, ['tsx-transform']);
		gulp.watch(path.TS_COMPILED, ['ts-convert']);
		
		var watcher = watchify(browserify({
			entries: [path.ENTRY],
			debug: true,
			cache: {}, packageCache: {}, fullPaths: true
		}));
		return watcher.on('update', function(){
			watcher.bundle()
			.pipe(source(path.DIST_OUT))
			.pipe(gulp.dest(path.DIST_SRC));	
		})
		.bundle()
		.pipe(source(path.DIST_OUT))
		.pipe(gulp.dest(path.DIST_SRC));
	};
	return callback();
});

// Public Distro
gulp.task('public', function(){
	browserify({
		entries: [path.ENTRY],	
	})
	.bundle()
	.pipe(source(path.MINIFY_OUT))
	.pipe(streamify(uglify({file:path.MINIFY_OUT})))
	.pipe(gulp.dest(path.DIST_SRC));
});



// Grouped Build

gulp.task('build', function(cb) {
	return synchronous(['ts-copy','tsx-transform', 'utils-copy'], 'ts-convert', function(){
		cb();
	});
});

// Clear Build Folders
var del = require('del');

gulp.task('clean:build', function(cb){
	del(['./build', './public'], cb);
});

// Summary Tasks 
gulp.task('dev', ['build'], function() {
	synchronous('watch'); // <-- until v4.0 replaces gulp.run with something else
}); 

gulp.task('dist', ['build'], function(){
	synchronous(['replaceHTML', 'public']);
});

gulp.task('default', function() { return 'options for gulp are: dev, dist, clean:build'; });