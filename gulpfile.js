var gulp = require('gulp');
var stylus = require('gulp-stylus');
var riot = require('gulp-riot');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

gulp.task('stylus', function() {
  gulp.src('./*.styl')
    .pipe( stylus() )
    .pipe( gulp.dest('./') );
});

gulp.task('riot', function() {
  gulp.src('./tags/*.tag')
    .pipe( riot({ type:'es6', minify: true }) )
    .pipe( concat('start.js') )
    .pipe( gulp.dest('./') );
});

gulp.task('watch', function() {
  gulp.watch('./*.styl', ['stylus']);
  gulp.watch('./tags/*.tag', ['riot']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      open: true,
      host: 'tjw.local',
      port: 8000
    }));
});

gulp.task('default', ['stylus', 'riot', 'watch', 'webserver']);
