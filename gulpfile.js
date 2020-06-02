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
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var frontMatter = require('gulp-front-matter');
var concat = require('gulp-concat');
var es = require('event-stream');
var mustache = require('mustache');
var fs = require('fs');
var sort = require('sort-stream');
var moment = require('moment');
var config = require('./config').config;

var destination = config.buildDest;

// command line params
// for instance: $ gulp --type production
var isProduction = args.type === 'production';

function capitalize (string) {
  return string[0].toUpperCase() + string.substr(1);
}

// html
gulp.task('html', function () {
  var dir = '';
  return gulp.src('src/html/**/*.html')
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(fileInclude())
    .pipe(es.map(function (file, cb) {
      var html = mustache.render(
        String(file.contents), {
          title: file.frontMatter.title
        });
      file.contents = new Buffer(html);
      cb(null, file);
    }))
    .pipe(gulpif(isProduction, gzip()))
    // rename the destination path for the file (avoiding .html)
    // unless it is index.html in which case just ignore it
    .pipe(rename(function (path) {
      if (path.basename !== 'index') {
        path.dirname = path.dirname + '/' + path.basename;
        path.basename = "index";
        path.extname = ".html";
      }
    }))
    .pipe(gulp.dest(destination));
});

// copy some fonts over
gulp.task('fonts', function () {
  gulp.src('src/fonts/**/*.*', { base: './src/fonts/' })
    .pipe(gulp.dest(destination + '/assets/fonts'));
});

// sass
gulp.task('styles', ['fonts'], function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass({ style: 'expanded', container: './tmp' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulpif(isProduction, rename({suffix: '.min'})))
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(gulpif(isProduction, gzip()))
    .pipe(gulp.dest(destination + '/assets/css'));
});

// jshint
gulp.task('jshint', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// js
gulp.task('scripts', ['browserify'], function() {
  return gulp.src(destination + '/assets/js/bundle.js')
    .pipe(gulpif(isProduction, rename({suffix: '.min'})))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, stripDebug()))
    .pipe(gulpif(isProduction, gzip()))
    .pipe(gulp.dest(destination + '/assets/js'));
});

// images
gulp.task('images', function() {
  return gulp.src(['src/images/**/*.PNG','src/images/**/*.png', 'src/images/**/*.JPG','src/images/**/*.jpg', 'src/images/**/*.SVG','src/images/**/*.svg', 'src/images/**/*.GIF','src/images/**/*.gif', 'src/images/**/*.ICO','src/images/**/*.ico'])
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
    .pipe(gulp.dest(destination + '/assets/img'));
});

gulp.task('clean', function(cb) {
  del([destination + '/*', destination + '/assets/css', destination + '/assets/fonts', destination + '/assets/img'], {force:true}, cb);
});

// default build task
gulp.task('default', ['clean'], function() {
  // clean first, then these
  gulp.start('html','styles', 'images');
});

// watch
gulp.task('watch', ['default'], function() {
  // if anything changes, rebuild
  gulp.watch('src/templates/**/*.tpl', ['html']);
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  gulp.watch('src/images/**/*', ['images']);
});

// test
