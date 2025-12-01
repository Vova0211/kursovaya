const {src, dest, watch, series, parallel} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const order = require('gulp-order');

const paths = {
  styles: {
    src: 'src/styles/*.css'
  },
  scripts: {
    src: 'src/js/*.js',
    order: ['variables.js','ParsePrintedData.js', 'SortUsers.js', 'Users.js', 'index.js']
  },
  html: {
    src: 'src/pages/*.html'
  },
  dist: 'dist/'
}

function buildStyles() {
  return src(paths.styles.src)
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(dest(paths.dist));
};

function cleanJs() {
  return src(paths.scripts.src)
    .pipe(order(paths.scripts.order))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(dest(paths.dist));
}

function cleanHTML() {
  return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.dist));
}

function watchStyle() { watch(paths.styles.src, buildStyles)}
function watchJS() {  watch(paths.scripts.src, cleanJs)}
function watchHTML() {  watch(paths.html.src, cleanHTML)}


exports.build = series(buildStyles, cleanJs, cleanHTML)
exports.default = parallel(watchHTML, watchJS, watchStyle)
