
// Include gulp
var gulp = require('gulp');
 // Include plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();

 // Concatenate JS Files & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['js/jquery-3.2.1.min.js','js/smooth-scroll.min.js','js/wow.min.js','js/particles.js','js/main.js','js/*.js'])
      .pipe(concat('all.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('../build/js'));
});

// Compile SASS Files
gulp.task('sass', function (){
  return gulp.src('sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./styles'));
});
gulp.task('sass:watch', function () {
  gulp.watch('../sass/**/*.scss',['sass']);
});

// Concatenate CSS Files
gulp.task('css', function () {
  return gulp.src(['styles/*.css','node_modules/normalize.css/normalize.css'])
    .pipe(concatCss("all.css"))
    .pipe(gulp.dest('../build/styles'));
});

// Uglify CSS
gulp.task('minify-css', () => {
  return gulp.src('.../build/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('.../build/styles'));
});

// Browsersync
gulp.task('browser-sync',['css'],function() {
    browserSync.init(["styles/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
    gulp.watch([".../build/styles/*.css","styles/*.css","sass/**/*.scss"],['css','sass'])
    gulp.watch([".../build/*.html","*.html"]).on('change', browserSync.reload);
    //  Add watcher to javascript director
});

 // Default Task
gulp.task('default', ['scripts','sass','css','minify-css','browser-sync']);



 // TODO