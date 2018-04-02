//  var gulp = require('gulp');
//  var sass = require('gulp-sass');
//  var sourcemaps = require("gulp-sourcemaps");
//  var browsersync = require("browser-sync").create();

//  gulp.task('sass', function() {
//    return gulp.src('scss/*.scss')
//    .pipe(sourcemaps.init())
//    .pipe(sass({outputStyle: 'expanded', errLogToConsole: true}).on('error', sass.logError))
//    .pipe(sourcemaps.write('./maps')) 
//    .pipe(gulp.dest('css'))
// });

// gulp.task('watch', function(){
// gulp.watch('scss/**/*.scss', ['sass']);
// })
// gulp.task('browsersync', function() {
//    var files = [
//       '*.html',
//       'css/**.css',
//       'js/**js'
//    ];
//    browsersync.init(files, {
//       server: {
//          baseDir: './'
//       }
//    });
// });
// gulp.task("default", ["watch", "browsersync"]);
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browsersync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
gulp.task('browsersync', function(){
  var files = [
      '*.html',
      'css/*.css',
      'js/**js'
  ];
  browsersync.init(files, {
      server: {
          baseDir: './'
      }
  });
});
gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded', errLogToConsole: true}).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['> 1%', 'last 2 version', 'android 4']}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('css'))
});
gulp.task('watch', function(){
  gulp.watch('scss/**/*.scss', ['sass'])
})
gulp.task('default', ['watch', 'browsersync'], function() {
});