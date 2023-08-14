var gulp = require("gulp");
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');


gulp.task('sass', function() {
    return sass('src/sass/') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('src/css'));
});

gulp.task('watchSassBuild',function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});


gulp.task('asb',['sass','watchSassBuild']);


gulp.task('minify-css', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});


gulp.task('js', function () {
   return gulp.src(['src/js/**/*.js','!src/js/**/*.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});


gulp.task('watchCssJavaScript',function() {
    gulp.watch('src/css/**/*.css',['minify-css']);
    gulp.watch(['src/js/**/*.js','!src/js/**/*.min.js'],['js']);
});


gulp.task('acj',['minify-css','js','watchCssJavaScript']);


gulp.task('default',['asb','acj']);