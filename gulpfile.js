const gulp = require('gulp');
const { series, parallel, src, dest } = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-minify-css');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const del = require('del');
const stripDebug = require('gulp-strip-debug');
const args = require('yargs').argv;
const gulpif = require('gulp-if');
const gzip = require('gulp-gzip');
const fileInclude = require('gulp-file-include');
const markdown = require('gulp-markdown');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const frontMatter = require('gulp-front-matter');
const concat = require('gulp-concat');
const es = require('event-stream');
const mustache = require('mustache');
const fs = require('fs');
const sort = require('sort-stream');
const moment = require('moment');
const config = require('./config.js').config;

const destination = config.buildDest;

// command line params
// for instance: $ gulp --type production
const isProduction = args.type === 'production';

// fill out the blog post templates
function blogPostsHTMLTask() {
  const post = String(fs.readFileSync('src/blog/post.html'));
  let dir = '';
  return src('src/blog/markdown/**/*.md')
    // extract frontmatter from markdown, append to file attributes
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    // render the partial
    .pipe(markdown())
    // insert frontmatter and partial as mustache vars into post template
    .pipe(es.map(function (file, cb) {
      const html = mustache.render(post, {
        buildDest: config.buildDest,
        include: file.frontMatter.readfullarticle,
        date: moment(file.frontMatter.date).format('MMMM D, YYYY'),
        authors: file.frontMatter.authors,
        rendered: file.contents
      });
      file.contents = new Buffer.from(html);
      cb(null, file);
    }))
    // include stuff
    .pipe(fileInclude())
    // insert handlebars values from frontmatter into head template
    .pipe(es.map(function (file, cb) {
      file.contents = new Buffer.from(
        mustache.render(
          String(file.contents), {
            title: file.frontMatter.title,
            base: config.baseURL,
            include: file.frontMatter.readfullarticle,
            summary: file.frontMatter.summary,
            thumbnail: file.frontMatter.thumbnail
          }));
      cb(null, file);
    }))
    // rename the destination path for the file (avoiding .html)
    .pipe(rename(function (path) {
      path.dirname = path.dirname + '/' + path.basename;
      path.basename = "index";
      path.extname = ".html";
    }))
    .pipe(dest(destination + '/blog'));
}

// blog post list for blog page
function blogPostsListTask() {
  const postlist = String(fs.readFileSync('src/blog/blogposts.html'));

  return src('src/blog/markdown/**/*.md')
    // extract the frontmatter from the .md add to file attributes
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    // use the frontmatter to populate a blog post list
    .pipe(es.map(function (file, cb) {
      const html = mustache.render(postlist, {
        post: file.frontMatter,
        date: moment(file.frontMatter.date).format('MMMM D, YYYY'),
        authors: file.frontMatter.authors.map(function(a){
          try {
            // Check if the author exists in the team directory (meaning, an active CoLabr)
            fs.accessSync('./src/html/team/' + a + '.html', fs.F_OK);
            return {
              lowercase: a,
              pic: a,
              capital: capitalize(a)
            };
          } catch (err) {
            // If fs doesn't see the author, assume inactive (so don't provide link)
            return {
              lowercase: '',
              pic: a,
              capital: capitalize(a)
            };
          }
        })
      });
      file.contents = new Buffer.from(html);
      cb(null, file);
    }))
    // sort the list newest-first
    .pipe(sort(function (a, b) {
      if (a.frontMatter.date > b.frontMatter.date) return -1;
      if (a.frontMatter.date < b.frontMatter.date) return 1;
      return 0;
    }))
    // concat the list into a single html
    .pipe(concat('blogposts.html'))
    .pipe(dest(destination));
}

// blog page pipeline
function blogTask() {
  // taking the blog post list from the 'blog-posts-list' step
  // and including it into the blog.html template
  return src('src/blog/blog.html')
    .pipe(es.map(function (file, cb) {
      // first inject the build destination so include knows where to go
      const html = mustache.render(
        String(file.contents), {
          buildDest: config.buildDest
        });
      file.contents = new Buffer.from(html);
      cb(null, file);
    }))
    // then actually include the headers, navs, blogposts, footer and tail
    .pipe(fileInclude())
    // then set the title
    .pipe(es.map(function (file, cb) {
      const html = mustache.render(
        String(file.contents), {
          title: 'Blog'
        });
      file.contents = new Buffer.from(html);
      cb(null, file);
    }))
    // now we have /blog tada
    .pipe(rename('blog/index.html'))
    .pipe(dest(destination));
}

function capitalize (string) {
  return string[0].toUpperCase() + string.substr(1);
}

// html
function htmlTask() {
  let dir = '';
  return src('src/html/**/*.html')
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    .pipe(fileInclude())
    .pipe(es.map(function (file, cb) {
      const html = mustache.render(
        String(file.contents), {
          title: file.frontMatter.title
        });
      file.contents = new Buffer.from(html);
      cb(null, file);
    }))
    .pipe(gulpif(isProduction, gzip()))
    // rename the destination path for the file (avoiding .html)
    // unless it is index.html in which case just ignore it
    .pipe(rename(function (path) {
      if (path.basename !== 'index' && path.basename !== 'atlassian-domain-verification') {
        path.dirname = path.dirname + '/' + path.basename;
        path.basename = "index";
        path.extname = ".html";
      }
    }))
    .pipe(dest(destination));
}

// copy some fonts over
function fontsTask() {
  return src('src/fonts/**/*.*', { base: './src/fonts/' })
    .pipe(dest(destination + '/assets/fonts'));
}

// sass
function sassTask() {
  return sass('src/styles/**/*.scss', { style: 'expanded', container: './tmp' })
    .pipe(dest(destination + '/assets/css'))
}

// styles
function stylesTask() {
  return src('/assets/css/**/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulpif(isProduction, rename({suffix: '.min'})))
    .pipe(gulpif(isProduction, minifycss()))
    .pipe(gulpif(isProduction, gzip()))
    .pipe(dest(destination + '/assets/css'));
}

// jshint
function jshintTask() {
  return src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
}

// browserify
function browserifyTask() {
  return browserify('./src/scripts/main.js')
    .bundle()

    // Stops Gulp from crashing on JS code error
    // https://truongtx.me/2014/07/15/handle-errors-while-using-gulp-watch/
    .on('error', function(err){
      console.log(err.message);
      this.end();
    })

    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(dest(destination + '/assets/js'));
}

// js
function scriptsTask() {
  return src(destination + '/assets/js/bundle.js')
    .pipe(gulpif(isProduction, rename({suffix: '.min'})))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, stripDebug()))
    .pipe(gulpif(isProduction, gzip()))
    .pipe(dest(destination + '/assets/js'));
}

// pdfs
function pdfsTask() {
  return src(['src/pdfs/**/*.pdf'])
    .pipe(dest(destination + '/assets/pdf'));
}

// images
function imagesTask() {
  return src(['src/images/**/*.PNG','src/images/**/*.png', 'src/images/**/*.JPG','src/images/**/*.jpg', 'src/images/**/*.SVG','src/images/**/*.svg', 'src/images/**/*.GIF','src/images/**/*.gif', 'src/images/**/*.ICO','src/images/**/*.ico'])
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
    .pipe(dest(destination + '/assets/img'));
}

// copy xml
function xmlTask()  {
  return src('src/**/*.xml')
    .pipe(dest(destination));
}

// RSS Feed (individual items)
function rssItemsTask() {
  const rssxml = String(fs.readFileSync('src/rss/rss-items.xml'));

  return src('src/blog/markdown/**/*.md')
    // extract the frontmatter from the .md add to file attributes
    .pipe(frontMatter({
      property: 'frontMatter',
      remove: true
    }))
    // use the frontmatter to populate a blog post list
    .pipe(es.map(function (file, cb) {
      let xml;

      xml = mustache.render(rssxml, {
        item: file.frontMatter,
        // link: 'https://colab.coop/blog' + '/' + file.frontMatter.readfullarticle + '.html'
      });
      file.contents = new Buffer.from(xml);
      cb(null, file);
    }))
    // sort the list newest-first
    .pipe(sort(function (a, b) {
      if (a.frontMatter.date > b.frontMatter.date) return -1;
      if (a.frontMatter.date < b.frontMatter.date) return 1;
      return 0;
    }))
    // concat the list into a single xml
    .pipe(concat('rss-items.xml'))
    .pipe(dest(destination));
}

// The RSS feed
function rssTask() {
  // taking the rss items list from the 'rss-items' step
  // and including it into the rss.xml template
  return src('src/rss/rss.xml')
    .pipe(es.map(function (file, cb) {
      // first inject the build destination so include knows where to go
      const xml = mustache.render(
        String(file.contents), {
          buildDest: config.buildDest
        });
      file.contents = new Buffer.from(xml);
      cb(null, file);
    }))
    // then actually include the items
    .pipe(fileInclude())
    // now we have /rss.xml tada
    .pipe(dest(destination));
}

function cleanTask(cb) {
  del([destination + '/*', destination + '/assets/css', destination + '/assets/fonts', destination + '/assets/js', destination + '/assets/img', destination + '/assets/pdf', destination + '/prototype', '!' + destination + '/editor'], {force:true});
  cb();
}

exports.default = parallel(series(blogPostsHTMLTask, blogPostsListTask, blogTask, htmlTask), xmlTask, series(rssItemsTask, rssTask), series(fontsTask, sassTask, stylesTask), series(jshintTask, browserifyTask, scriptsTask), imagesTask, pdfsTask);
