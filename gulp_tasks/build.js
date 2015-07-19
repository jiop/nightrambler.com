/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */

module.exports = function(gulp, $, config) {
  var gt = require('./gulp-tools')(gulp, $, config);
  return function() {
    gt.log('Building everything');
    var msg = {
      title: 'gulp build',
      subtitle: 'Deployed to the build folder',
      message: 'Running `gulp serve-build`'
    };
    $.del(config.temp);
    gt.log(msg);
    gt.notify(msg);
  };
};
