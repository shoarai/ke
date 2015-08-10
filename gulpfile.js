var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack', function() {
  return gulp.src('src/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'js/index.js',
      }
    }))
    .pipe(gulp.dest('dist/'));
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
});

gulp.task('default', ['watch']);
