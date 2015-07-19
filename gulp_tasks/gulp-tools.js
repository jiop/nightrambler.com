module.exports = function(gulp, $, config) {
  /**
   * Utility functions
   */
  var self = {};
  var port = process.env.PORT || config.defaultPort;
  var args = require('yargs').argv;
  var path = require('path');
  var _    = require('lodash');
  /**
   * serve the code
   * --nosync
   * @param  {Boolean} isDev - dev or build mode
   * @param  {Boolean} specRunner - server spec runner html
   */
  self.serve = function(isDev, specRunner) {
    var nodeOptions = self.getNodeOptions(isDev);
    if (args.verbose) {
      console.log(nodeOptions);
    }
    return $.nodemon(nodeOptions)
      .on('restart', ['vet'], function(ev) {
        self.log('*** nodemon restarted');
        self.log('files changed:\n' + ev);
        setTimeout(function() {
          self.browserSync.notify('reloading now ...');
          self.browserSync.reload({stream: false});
        }, config.browserReloadDelay);
      })
      .on('start', function() {
        self.log('*** nodemon started');
        self.startBrowserSync(isDev, specRunner);
      })
      .on('crash', function() {
        self.log('*** nodemon crashed: script crashed for some reason');
      })
      .on('exit', function() {
        self.log('*** nodemon exited cleanly');
      });
  };

  self.getNodeOptions = function(isDev) {
    return {
      script: config.nodeServer,
      delayTime: 1,
      env: {
        'PORT': port,
        'NODE_ENV': isDev ? 'dev' : 'build'
      },
      watch: [config.server]
    };
  };

  /**
   * Format and return the header for files
   * @return {String}           Formatted file header
   */
  self.getHeader = function() {
    var pkg = require('../package.json');
    var template = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @authors <%= pkg.authors %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''
    ].join('\n');
    return $.header(template, {
      pkg: pkg
    });
  };

  /**
   * Inject files in a sorted sequence at a specified inject label
   * @param   {Array} src   glob pattern for source files
   * @param   {String} label   The label name
   * @param   {Array} order   glob pattern for sort order of the files
   * @returns {Stream}   The stream
   */
  self.inject = function(src, label, order) {
    var options = {read: false};
    if (label) {
      options.name = 'inject:' + label;
    }
    return $.inject(self.orderSrc(src, order), options);
  };

  /**
   * Order a stream
   * @param   {Stream} src   The gulp.src stream
   * @param   {Array} order Glob array pattern
   * @returns {Stream} The ordered stream
   */
  self.orderSrc = function(src, order) {
    return gulp
      .src(src)
      .pipe($.if(order, $.order(order)));
  };

  /**
   * Delete all files in a given path
   * @param  {Array}   path - array of paths to delete
   * @param  {Function} done - callback when complete
   */
  self.clean = function(path, done) {
    self.log('Cleaning: ' + $.util.colors.blue(path));
    $.del(path, done);
  };

  /**
   * Log a message or series of messages using chalk's blue color.
   * Can pass in a string, object or array.
   */
  self.log = function(msg) {
    if (typeof(msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          $.util.log($.util.colors.blue(msg[item]));
        }
      }
    } else {
      $.util.log($.util.colors.blue(msg));
    }
  };

  /**
   * Show OS level notification using node-notifier
   */
  self.notify = function(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
      sound: 'Bottle',
      contentImage: path.join(__dirname, 'gulp.png'),
      icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
  };

  /**
   * Formatter for bytediff to display the size changes after processing
   * @param  {Object} data - byte data
   * @return {String}      Difference in bytes, formatted
   */
  self.bytediffFormatter = function(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
      (data.startSize / 1000).toFixed(2) + ' kB to ' +
      (data.endSize / 1000).toFixed(2) + ' kB and is ' +
      self.formatPercent(1 - data.percent, 2) + '%' + difference;
  };

  /**
   * Log an error message and emit the end of a task
   */
  self.errorLogger = function(error) {
    self.log('*** Start of Error ***');
    self.log(error);
    self.log('*** End of Error ***');
    this.emit('end');
  };

  /**
   * Format a number as a percentage
   * @param  {Number} num       Number to format as a percent
   * @param  {Number} precision Precision of the decimal
   * @return {String}           Formatted perentage
   */
  self.formatPercent = function(num, precision) {
    return (num * 100).toFixed(precision);
  };

  /**
   * Start BrowserSync
   * --nosync will avoid browserSync
   */
  self.startBrowserSync = function(isDev, specRunner) {
    var browserSync = require('browser-sync');
    if (args.nosync || browserSync.active) {
      return;
    }
    self.log('Starting BrowserSync on port ' + port);
    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    if (isDev) {
      gulp.watch([config.sass], ['styles'])
        .on('change', self.changeEvent);
    } else {
      gulp
        .watch(
          [config.sass, config.js, config.html],
          ['optimize', browserSync.reload]
        )
        .on('change', self.changeEvent);
    }
    var options = {
      proxy: 'localhost:' + port,
      port: 3000,
      files: isDev ? [
        config.client + '**/*.*',
        '!' + config.sass,
        config.temp + '**/*.css'
      ] : [],
      ghostMode: { // these are the defaults t,f,t,t
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'nightrambler.com',
      notify: true,
      reloadDelay: 0
    };
    if (specRunner) {
      options.startPath = config.specRunnerFile;
    }
    browserSync(options);
  };

  /**
   * When files change, log it
   * @param  {Object} event - event that fired
   */
  self.changeEvent = function(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    self.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
  };

  return self;
};
