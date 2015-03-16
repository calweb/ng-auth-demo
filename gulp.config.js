module.exports = function() {
  var app = './app/';
  var temp = './app/.tmp/';

  var config = {
    temp: temp,
    app: app,

    // all the js file to vet
    alljs: [
      app + '**/*.js',
      './*.js',
      '!' + app + 'vendor/**/*.js',
      '!' + './server.js',
      '!' + app + 'auth/directives/passwordStrength.js'
    ],
    allSass: [
      app + 'sass/**/*.scss'
    ],
    index: app + 'index.html',
    css: temp + 'styles.css',
    js: [
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],
    sass: app + 'sass/styles.scss',


    // Bower and NPM locations
    bower: {
      json: require('./bower.json'),
      directory: app + 'vendor/',
      ignorePath: '../..'
    }

  };

  config.getWiredepOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;

  };

  return config;
};
