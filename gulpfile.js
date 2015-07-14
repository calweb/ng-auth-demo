var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var q = require('q');
var env = process.env.NODE_ENV;

if (env === "production") {
  return;
}

if (env === 'development') {
  var $ = require('gulp-load-plugins')({
    lazy: true,
    rename: {
      'gulp-ruby-sass': 'sass',
      'gulp-angular-filesort': 'filesort'
    }
  });

  var port = process.env.PORT || config.defaultPort;

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
      script: config.nodeServer,
      delayTime: 1,
      env: {
        'PORT': port,
        'NODE_ENV': isDev ? 'dev' : 'build'
      },
      watch: [config.server]
    };

    return $.nodemon(nodemonOptions)
      .on('restart', ['vet'], function(event) {
        log('*** Server restarted ***');
        log('files changed on restart:\n' + event);
      })
      .on('start', function() {
        log('*** Server started ***');
        startBrowserSync()
      })
      .on('crash', function() {
        log('*** Server crashed: Script crashed for some reason ***');
      })
      .on('exit', function() {
        log('*** Server exited cleanly ***');
      });

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

  function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
  }

  function startBrowserSync() {
    var defer = q.defer();

    if (browserSync.active) {
      return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.sass], ['sass'])
      .on('change', function(event) {
        changeEvent(event);
      });

    var options = {
      proxy: 'localhost:' + port,
      port: 3000,
      files: [
        config.app + '**/*.*',
        config.temp + '**/*.css'
      ],
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'gulp-patterns',
      notify: true,
      reloadDelay: 1000
    };

    defer.promise.then(browserSync);
    defer.resolve(options)
  }

}
