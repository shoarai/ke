var gulp = require('gulp');
// var gutil = require('gulp-util');
var del = require('del');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('webpack', function() {
  return gulp.src('src/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'js/index.js',
      }
    }))
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  return gulp.src(
    ['src/*.html', 'src/css/**', 'src/lib/**'],
    {base: 'src'}
  )
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['webpack', 'copy'], function() {
  gulp.watch(['src/js/*.js'], ['webpack']);
  gulp.watch(['src/*.html', 'src/css/**', 'src/lib/**'], ['copy']);
});

gulp.task('default', ['watch']);
