module.exports = function() {
  var client = './src/client/';
  var clientApp = client + 'assets/';
  var temp = './.tmp/';
  var root = './';
  var server = './src/server/';
  var wiredep = require('wiredep');
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };

  var config = {
    /**
     * File paths
     */
    alljs: [
      './src/**/*.js',
      './*.js',
      './gulp_tasks/*.js'
    ],
    build: './build/',
    client: client,
    css: temp + 'app.css',
    fonts: bower.directory + 'font-awesome/fonts/**/*.*',
    html: client + '**/*.html',
    htmltemplates: [
      client + 'templates/**/*.html',
      client + 'partials/**/*.html',
      client + 'views/**/*.html',
    ],
    images: client + 'assets/img/**/*.*',
    index: client + 'index.html',
    js: [
      clientApp + 'js/**/*.js',
      '!' + clientApp + 'js/**/*.spec.js'
    ],
    jsOrder: [
      '**/*.controller.js',
      '**/*.service.js',
      '**/app.js'
    ],
    sass: client + 'assets/scss/*.scss',
    sassDependencies: [
      bower.directory + 'foundation-apps/scss'
    ],

    root: root,
    server: server,
    source: 'src/',

    stubsjs: '',
    temp: temp,

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],

    /**
     * optimized files
     */
    optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },

    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * template cache
     */
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.appController',
        root: 'src/client/templates/',
        standAlone: false
      }
    },

    /**
     * Node settings
     */
    nodeServer: './src/server/app.js',
    defaultPort: '7203'
  };

  /**
  * wiredep and bower settings
  */
  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
