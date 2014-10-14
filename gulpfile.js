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

// command line params
// for instance: $ gulp --type production
var isProduction = args.type === 'production';

// blog page pipeline
gulp.task('blog', ['blog-posts-list'], function () {
  return gulp.src('src/blog/blog.html')
    .pipe(fileInclude())
    .pipe(gulp.dest('dist'));
});

// blog post list for blog page
gulp.task('blog-posts-list', ['blog-posts-html'], function () {
  var postlist = String(fs.readFileSync('src/blog/blogposts.html'));

  return gulp.src('src/blog/markdown/**/*.md')
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(es.map(function (file, cb) {
      var html = mustache.render(postlist, {
        post: file.frontMatter
      });
      file.contents = new Buffer(html);
      cb(null, file);
    }))
    .pipe(concat('blogposts.html'))
    .pipe(gulp.dest('dist'));
});

// fill out the blog post templates
gulp.task('blog-posts-html', ['blog-posts-partials'], function () {
  var post = String(fs.readFileSync('src/blog/post.html'));
  return gulp.src('src/blog/markdown/**/*.md')
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(es.map(function (file, cb) {
      var html = mustache.render(post, {
        include: file.frontMatter.readfullarticle
      });
      file.contents = new Buffer(html);
      cb(null, file);
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(fileInclude())
    .pipe(gulp.dest('dist'));
});

// create the partials for the post template
gulp.task('blog-posts-partials', function () {
  return gulp.src('src/blog/markdown/**/*.md')
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(markdown())
    .pipe(gulp.dest('dist'));
});

// html
gulp.task('html', ['blog'], function () {
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

// jshint
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
  gulp.watch('src/templates/**/*.tpl', ['html']);
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/blog/**/*.md', ['html']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
});