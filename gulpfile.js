/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');

gulp.task('default', function() {

});

gulp.task('styles', function() {
  return gulp.src('css/*.css')
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js-lint-compile', function() {
  return gulp.src('js/*.js') //reads all files in js w/ a .js extension
    .pipe(jshint()) // run their contents through jshint
    .pipe(jshint.reporter('default')) // report any findings from jshint
    .pipe(gulp.dest('dist/js')) // write that file to the dist/js dir
    .pipe(rename({suffix: '.min' })) // renames the file in memory
    .pipe(uglify()) // runs uglify on all.min.js (for minification)
    .pipe(gulp.dest('dist/js')) // write all.min.js to the dist/js dir
});

gulp.task('images', function() {
  return gulp.src('img/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
});
