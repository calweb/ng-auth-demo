var gulp = require('gulp');
// var sass = require('gulp-ruby-sass');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({
  lazy: true,
  rename: {
    'gulp-ruby-sass': 'sass',
    'gulp-angular-filesort': 'filesort'
  }
});

gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('sass', ['clean-sass'], function(done) {
  log('Compiling Sass => CSS');

  return $.sass(config.sass)
    .on('error', function(err) {
      console.error('Error! --> ', err.message);
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 version', '> 3%']
    }))
    .pipe(gulp.dest(config.temp));
});

gulp.task('clean-sass', function(done) {
  var files = config.temp + '**/*.css';
  clean(files, done);
});

gulp.task('sass-watch', function() {
  gulp.watch([config.sass], ['sass']);
});

gulp.task('wiredep', function() {
  log('Injecting bower components and Application JavaScripts => HTML');

  var options = config.getWiredepOptions();
  var wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)
      .pipe($.filesort()), {
        relative: true
      }))
    .pipe(gulp.dest(config.app));
});

gulp.task('inject', ['wiredep', 'sass'], function() {
  log('Injecting application CSS => HTML');

  return gulp
    .src(config.index)
    .pipe($.inject(gulp.src(config.css), {
      relative: true
    }))
    .pipe(gulp.dest(config.app));
});

gulp.task('serve-dev', ['inject'], function() {
  var isDev = true;
  var nodemonOptions = {
    script: config.nodeServer, //TODO app.js
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': isDev ? 'dev' : 'build';
    }
  }
  $.nodemon
});

/////////////////// Custom functions ///////////////////////////////

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}


function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}
