var gulp = require('gulp');
var karma = require('karma').server;
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var paths = {
  src: {
    bower: './client/app/src/bower_components',
    js: './client/app/src/js',
    scss: './client/app/src/scss',
    img: './client/app/src/img',
    views: './client/app/src/views'
  },
  dist: {
    js: './client/app/dist/js',
    css: './client/app/dist/css',
    img: './client/app/dist/img',
    views: './client/app/dist/views'
  },
  serverSpec: __dirname + '/spec/server/**/*.js',
  karmaConf: __dirname + '/spec/karma.conf.js'
};

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

var jsFiles = [
  paths.src.bower + '/angular/angular.js',
  paths.src.bower + '/angular-ui-router/release/angular-ui-router.js',
  paths.src.js + '/app.js',
  paths.src.js + '/controllers/*.js',
  paths.src.js + '/directives/*.js',
  paths.src.js + '/services/*.js'

];

gulp.task('javascript', function() {
  gulp.src(jsFiles)
  .pipe(concat('app.min.js'))
  // .pipe(uglify({
  //   beautify: true
  // }))
  .on('error', handleError)
  .pipe(gulp.dest(paths.dist.js));
});

gulp.task('lint', function() {
  gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('image', function() {
   gulp.src(paths.src.img + '/**/*')
    .pipe(image())
    .on('error', handleError)
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task('moveViews', function() {
  gulp.src(paths.src.views + '/**/*')
    .pipe(gulp.dest(paths.dist.views));
});

gulp.task('compass', function() {
  gulp.src(paths.src.scss + '/*.scss')
    .pipe(compass({
      css: paths.dist.css,
      sass: paths.src.scss,
      image: paths.dist.img,
      require: ['breakpoint']
    }))
    .on('error', handleError)
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('karma', function (done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});

gulp.task('mocha', function () {
  return gulp.src(paths.serverSpec, {read: false})
    .pipe(mocha({
      reporter: 'spec',
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.img + '/**/*', ['image']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['compass']);
  gulp.watch(paths.src.js + '/**/*.js', ['lint', 'javascript']);
  gulp.watch(paths.src.views + '/**/*', ['moveViews']);
});

// Run testing suite: karma (client-side) and mocha (server-side)
gulp.task('test', function(callback) {
  // Use `runSequence` to call tasks synchronously, otherwise
  // messages from both will be potentially interleaved.
  runSequence('karma', 'mocha', callback);
});

gulp.task('default', ['compass', 'image', 'moveViews', 'lint', 'javascript', 'watch']);
