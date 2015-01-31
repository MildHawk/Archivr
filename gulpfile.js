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
var preprocess = require('gulp-preprocess');

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
  jade: './server/views/_partials',
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

// Keep track of own JS files for linting
var jsFilesForLint = [
  paths.src.js + '/**/*.js',
  './spec/**/*.js'
];

var jadeFiles = [paths.jade + '/*.jade'];

/**
 * envConfig, envConfigDevelopment, and envConfigProduction are used to configure builds
 * with the proper environment. Arguments are passed into the preprocess
 * task to insert variables into files. For example, the base href needs
 * to be dynamically set based on the environment.
 */
var envConfig;

var envConfigDevelopment = {
  BASE_HREF: 'localhost:3000'
};

var envConfigProduction = {
  BASE_HREF: 'archivr-dev.herokuapp.com'
};

gulp.task('javascript', function() {
  gulp.src(jsFiles)
  .pipe(concat('app.min.js'))
  // .pipe(uglify({
  //   beautify: true
  // }))
  .on('error', handleError)
  .pipe(gulp.dest(paths.dist.js));
});

/**
 * Run JSHint
 */
gulp.task('lint', function() {
  return gulp.src(jsFilesForLint)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    // Error out if any warnings appear
    .pipe(jshint.reporter('fail'));
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
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('processEnv', function() {
  gulp.src(jadeFiles)
    .pipe(preprocess({context: envConfig}))
    .pipe(gulp.dest(paths.jade + '/dist'));
});

gulp.task('karma', function (done) {
  return karma.start({
    configFile: paths.karmaConf,
    singleRun: true
  }, done);
});






var handleMochaError = function (err) {
  console.log(err.message);
  process.exit(1);
};

// gulp.task('static', function () {
//   return gulp.src([
//     'test/*.js',
//     'lib/**/*.js',
//     'benchmark/**/*.js',
//     'index.js',
//     'doc.js',
//     'gulpfile.js'
//   ])
//   .pipe(jshint('.jshintrc'))
//   .pipe(jshint.reporter('jshint-stylish'))
//   .pipe(jshint.reporter('fail'))
//   .pipe(jscs())
//   .on('error', handleErr);
//   // .pipe(eslint())
//   // .pipe(eslint.format())
//   // .pipe(eslint.failOnError());
// });

var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var plumber = require('gulp-plumber');

gulp.task('testStuff', function () {
  var mochaErr;

  gulp.src([
    // 'lib/**/*.js',
    // 'index.js'
    './server/**/*.js'
  ])
  .pipe(istanbul({
    includeUntested: true
  }))
  .pipe(istanbul.hookRequire())
  .on('finish', function () {
    gulp.src(['./spec/server/userRouter.js'])
      .pipe(plumber())
      .pipe(mocha({
        reporter: 'spec',
        timeout: 20000
      }))
      .on('error', function (err) {
        mochaErr = err;
      })
      .pipe(istanbul.writeReports())
      .on('end', function () {
        if (mochaErr) return handleError(mochaErr);
        // handleError(mochaErr);
      });
  });
});

gulp.task('coveralls', function () {
  if (!process.env.CI) return;
  // return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

// gulp.task('mocha', ['testStuff', 'coveralls'])










// var istanbul = require('gulp-istanbul');
// We'll use mocha here, but any test framework will work
// var mocha = require('gulp-mocha');

// gulp.task('mocha', function (cb) {
//   return gulp.src(['lib/**/*.js', 'main.js'])
//     .pipe(istanbul()) // Covering files
//     .pipe(istanbul.hookRequire()) // Force `require` to return covered files
//     .on('finish', function () {
//       gulp.src(['test/*.js'])
//         .pipe(mocha())
//         .pipe(istanbul.writeReports()) // Creating the reports after tests runned
//         .on('end', cb);
//     });
// });

// gulp.task('serverUnitTests', function(callback) {
//     var coverageVar = '$$server_cov_' + new Date().getTime() + '$$';
//     gulp.src([ './server/**/*.js' ])
//         // Instrument source code
//         .pipe(
//             istanbul({
//                 coverageVariable: coverageVar
//             })
//         )
//         .on('finish', function (){
//             // Load tests into mocha
//             gulp.src( paths.serverSpec )
//                 .pipe(
//                     mocha({
//                         reporter: 'spec'
//                     })
//                     .on( 'error', handleError )
//                 )
//                 // Create coverage reports
//                 .pipe(istanbul.writeReports({
//                     dir: __dirname,
//                     reporters: ['html', 'lcov', 'text-summary', 'json'],
//                     reportOpts: {
//                         dir: __dirname
//                     },
//                     coverageVariable: coverageVar
//                 }))
//                 // Throw error if coverage thresholds not met
//                 .pipe( istanbulEnforcer(enforcerOptions) )
//                 .on( 'error', handleError )
//                 .on( 'end', callback );
//         });
// });

gulp.task('something', function(cb) {
  console.log('something else');
  cb();
})

// ----- last version ----
gulp.task('mocha', function (cb) {
  var mochaErr;
  gulp.src(['./server/**/*.js'])
    .pipe(istanbul({ includeUntested: true })) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
      gulp.src('./spec/server/userRouter.js', {read: false})
      // gulp.src(paths.serverSpec, {read: false})
        .pipe(plumber())
        .pipe(mocha({
          reporter: 'spec',
          timeout: 20000
        }))
        .on('error', function(err) {
          // console.log('error reached', err);
          mochaErr = err;
        })
        .pipe(istanbul.writeReports())
        .on('end', function () {
          console.log('end reached');
          // handleError(mochaErr);
          if (mochaErr) {
            handleMochaError(mochaErr);
          }
          process.exit();
          // cb();
          // cb(mochaErr);
        })
    });

// gulp.task('something', ['mocha'], function(cb) {
//   console.log('doing something else');
//   cb();
// });

// gulp.task('somethingElse', ['mocha', 'something'], function() {
//   console.log('all done!');
//   cb();
// });

// gulp.task('mocha', function () {
//   return gulp.src(paths.serverSpec, {read: false})
//     .pipe(istanbul()) // Covering files
//     .pipe(istanbul.hookRequire()) // Force `require` to return covered files
//     .on('finish', function() {

//     });
//     .pipe(mocha({
//       reporter: 'spec',
//       timeout: 20000
//     }))
    /**
     * The methods below are a hack to get gulp to exit after mocha tests
     * finish. Without these methods, you must ^+C to exit, and Travis will
     * never finish running the tests.
     *
     * However, it suppresses error messages from mocha (e.g. server
     * errors that cause the process to crash). If the tests are not running
     * or Travis is behaving strangely, comment out these methods to report
     * the errors and debug.
     */
    // .once('error', function () {
    //     process.exit(1);
    // })
    // .once('end', function () {
    //   process.exit();
    // });
});

gulp.task('watch', function() {
  gulp.watch(paths.src.img + '/**/*', ['image']);
  gulp.watch(paths.src.scss + '/**/*.scss', ['compass']);
  gulp.watch(paths.src.js + '/**/*.js', ['lint', 'javascript']);
  gulp.watch(paths.src.views + '/**/*', ['moveViews']);
});

// Run testing suite: lint, karma (client-side) and mocha (server-side)
gulp.task('test', function(callback) {
  /**
   * Use `runSequence` to call tasks synchronously, otherwise
   * messages from both will be potentially interleaved.
   */
  runSequence('lint', 'karma', 'mocha', callback);
});

/**
 * build-development and build-production tasks are to build out the app with different
 * configurations. Preprocessing is necessary to insert the appropriate
 * base href into the Jade partials.
 */
gulp.task('build-development', function() {
  envConfig = envConfigDevelopment;
  gulp.start('compass', 'image', 'moveViews', 'lint', 'javascript', 'processEnv');
});

gulp.task('build-production', function() {
  envConfig = envConfigProduction;
  gulp.start('compass', 'image', 'moveViews', 'lint', 'javascript', 'processEnv');
});

gulp.task('default', ['build-development', 'watch']);
