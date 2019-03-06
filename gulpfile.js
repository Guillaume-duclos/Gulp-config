// Dependencies
const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS     = require('gulp-clean-css'),
      sourcemaps   = require('gulp-sourcemaps'),
      watch        = require('gulp-watch'),
      minify       = require('gulp-minify'),
      babel        = require('gulp-babel');

sass.compiler = require('node-sass');

// Watching changes to dev
gulp.task('watch', () => {
  return watch('./src/styles/scss/*.scss', () => {
    gulp.src('./src/styles/scss/index.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./src/styles/css'));
  })
});

// Build CSS - Auto prefixing & minify
gulp.task('build-css', () => {
  return gulp.src('./src/styles/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/styles'));
});

// Build JS - ES6+ & minify
gulp.task('build-js', () => {
  gulp.src('./src/js/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(minify({
      noSource: true,
      ext: {min: '.js'},
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./build/js'))
});