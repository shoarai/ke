var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var webpack = require('gulp-webpack');
// var uglify = require('gulp-uglify');
var ftp = require('gulp-ftp');

var webpackConfig = require('./webpack.config.js');
var ftpConfig = require('./ftp.config.js');

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('copy', function () {
  return gulp.src(
    ['src/*.html', 'src/css/**', 'src/lib/**'],
    {base: 'src'}
  )
  .pipe(gulp.dest('dist'));
});

gulp.task('webpack', function() {
  return gulp.src('src/js/index.js')
    .pipe(webpack(webpackConfig))
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function() {
  gulp.start(['webpack', 'copy']);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['src/js/*.js'], ['webpack']);
  gulp.watch(['src/*.html', 'src/css/**', 'src/lib/**'], ['copy']);
});

// gulp.task('deploy', ['build'], function() {
gulp.task('deploy', function() {
  return gulp.src('dist/**')
    .pipe(ftp(ftpConfig))
    .pipe(gutil.noop());
});

gulp.task('default', ['watch']);
