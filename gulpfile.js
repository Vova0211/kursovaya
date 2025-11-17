const {src, dest, watch, series, parallel} = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

function buildStyles() {
  return src('./src/styles/style.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/'));
};

function cleanJs() {
  return src('src/js/index.js')
    .pipe(uglify())
    .pipe(dest('dist/'));
}

function cleanHTML() {
  return src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
}

function watchStyle() { watch('src/styles/style.css', buildStyles)}
function watchJS() {  watch('src/js/index.js', cleanJs)}
function watchHTML() {  watch('src/pages/index.html', cleanHTML)}


exports.build = series(buildStyles, cleanJs, cleanHTML)
exports.default = parallel(watchHTML, watchJS, watchStyle)
