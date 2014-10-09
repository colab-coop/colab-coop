var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var fileInclude = require('gulp-file-include');

// prototype task
gulp.task('default', ['prototype-html', 'prototype-styles', 'prototype-fonts', 'prototype-images', 'prototype-js', 'prototype-style-guide']);

// prototype html
gulp.task('prototype-html', function () {
  return gulp.src('./html/**/*.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('../../dist/prototype'));
});

// prototype copy style-guide over
gulp.task('prototype-style-guide', function () {
  return gulp.src('./style-guide/**/*.*', { base: './style-guide/' })
    .pipe(gulp.dest('../../dist/prototype/style-guide'));
});

// prototype copy some fonts over
gulp.task('prototype-fonts', function () {
  gulp.src('./fonts/**/*.*', { base: './fonts/' })
    .pipe(gulp.dest('../../dist/prototype/assets/fonts'));
});

// prototype copy some images over
gulp.task('prototype-images', function () {
  gulp.src('./images/**/*.*', { base: './images/' })
    .pipe(gulp.dest('../../dist/prototype/assets/img'));
});

// prototype copy some scripts over
gulp.task('prototype-js', function () {
  gulp.src('./scripts/**/*.*', { base: './scripts/' })
    .pipe(gulp.dest('../../dist/prototype/assets/js'));
});

// prototype sass
gulp.task('prototype-styles', function() {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('../../dist/prototype/assets/css'));
});
