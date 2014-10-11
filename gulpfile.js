var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var del = require('del');
var stripDebug = require('gulp-strip-debug');
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var gzip = require('gulp-gzip');
var fileInclude = require('gulp-file-include');
var markdown = require('gulp-markdown');
var mustache = require('gulp-mustache');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

// command line params
// for instance: $ gulp --type production
var isProduction = args.type === 'production';

// mustache
gulp.task('mustache', function () {
  return gulp.src('src/mustache/**/*.mustache')
    .pipe(mustache({
      msg: '--==built on ' + new Date(Date.now()) + '==--'
    }, {
      extension: '.html'
    }))
    .pipe(gulp.dest('dist'));
});

// markdown
gulp.task('markdown', function () {
  return gulp.src('src/markdown/**/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('dist'));
});

// html
gulp.task('html', ['mustache', 'markdown'], function () {
  return gulp.src('src/html/**/*.html')
    .pipe(fileInclude())
    .pipe(gulpif(isProduction, gzip()))
    .pipe(gulp.dest('dist'));
});

// copy some fonts over
gulp.task('fonts', function () {
  gulp.src('src/fonts/**/*.*', { base: './src/fonts/' })
    .pipe(gulp.dest('dist/assets/fonts'));
});

// sass
gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulpif(isProduction, rename({suffix: '.min'})))
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(gulpif(isProduction, gzip()))
    .pipe(gulp.dest('dist/assets/css'));
});

// browserify
gulp.task('browserify', ['jshint'], function () {
  return browserify('./src/scripts/main.js')
    .bundle()
  //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
  // Start piping stream to tasks!
    .pipe(gulp.dest('dist/assets/js'));
});

// jshint (should be an npm task)
gulp.task('jshint', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// js
gulp.task('scripts', ['browserify'], function() {
  return gulp.src('dist/assets/js/bundle.js')
    .pipe(gulpif(isProduction, rename({suffix: '.min'})))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, stripDebug()))
    .pipe(gulpif(isProduction, gzip()))
    .pipe(gulp.dest('dist/assets/js'));
});

// images
gulp.task('images', function() {
  return gulp.src(['src/images/**/*.png', 'src/images/**/*.jpg'])
    .pipe(
      gulpif(
        isProduction,
        imagemin(
          {
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
          }
        )
      )
    )
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('clean', function(cb) {
  del(['dist/*', 'dist/assets/css', 'dist/assets/fonts', 'dist/assets/js', 'dist/assets/img', 'dist/prototype'], cb);
});

// default build task
gulp.task('default', ['clean'], function() {
  // clean first, then these
  gulp.start('html', 'styles', 'scripts', 'images');
});

// watch
gulp.task('watch', ['default'], function() {
  // if anything changes, rebuild
  gulp.watch('src/markdown/**/*.md', ['html']);
  gulp.watch('src/mustache/**/*.mustache', ['html']);
  gulp.watch('src/templates/**/*.tpl', ['html']);
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
});