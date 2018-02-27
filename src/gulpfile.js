
// Include gulp
var gulp = require('gulp');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();

 // Include plugins
// var sass = require('gulp-sass');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var cleanCSS = require('gulp-clean-css');
// var rename = require('gulp-rename');
// var concatCss = require('gulp-concat-css');

//  // Concatenate JS Files & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src(['js/jquery-3.2.1.min.js','js/smooth-scroll.min.js','js/wow.min.js','js/particles.js','js/main.js','js/*.js'])
//       .pipe(concat('all.js'))
//       .pipe(rename({suffix: '.min'}))
//       .pipe(uglify())
//       .pipe(gulp.dest('../docs/js'));
// });

// // Compile SASS Files
// gulp.task('sass', function (){
//   return gulp.src('sass/**/*.scss')
//   .pipe(sass().on('error', sass.logError))
//   .pipe(gulp.dest('./styles'));
// });
// gulp.task('sass:watch', function () {
//   gulp.watch('../sass/**/*.scss',['sass']);
// });

// // Concatenate CSS Files
// gulp.task('css', function () {
//   return gulp.src(['styles/*.css','node_modules/normalize.css/normalize.css'])
//     .pipe(concatCss("all.css"))
//     .pipe(gulp.dest('../docs/styles'));
// });

// // Minify CSS (packs for file size.)
// gulp.task('minify-css', () => {
//   return gulp.src('.../docs/styles/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('.../docs/styles'));
// });

// Parse build blocks + uglify css and js.
gulp.task('docs', function (){
  return gulp.src('*.html')
  .pipe(useref())
  .pipe(gulp.dest('../docs'))
});

// Browsersync (best for testing during development.)
gulp.task('browser-sync',function() {
    browserSync.init(["styles/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
    gulp.watch([".../docs/styles/*.css","styles/*.css","sass/**/*.scss"])
    gulp.watch([".../docs/*.html","*.html"]).on('change', browserSync.reload);
    //  Add watcher to javascript director
});

 // Default Task (runs all of this stuff.)
gulp.task('default', ['docs','browser-sync']);
