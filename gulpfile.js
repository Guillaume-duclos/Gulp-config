// Dependencies
const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS     = require('gulp-clean-css'),
      sourcemaps   = require('gulp-sourcemaps');

// SASS tasks
sass.compiler = require('node-sass');

gulp.task('sass', () => {
  return gulp.src('./src/styles/scss/index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/styles/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/styles/scss/*.scss', ['sass']);
});
