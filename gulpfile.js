var gulp    = require('gulp');
var $       = require('gulp-load-plugins')({lazy: true});
$.del       = require('del');
var config  = require('./gulp.config')();
var gt      = require('./gulp_tasks/gulp-tools')(gulp, $, config);

function getTask(task) {
  return require('./gulp_tasks/' + task)(gulp, $, config);
}

gulp.task('default', ['help']);
gulp.task('help', $.taskListing);

gulp.task('vet', getTask('vet'));
gulp.task('test', ['vet'], getTask('test'));

gulp.task('clean-fonts', getTask('clean-fonts'));
gulp.task('clean-images', getTask('clean-images'));
gulp.task('clean-code', getTask('clean-code'));
gulp.task('clean-styles', getTask('clean-styles'));
gulp.task('clean', getTask('clean'));

gulp.task('styles', ['clean-styles'], getTask('styles'));
gulp.task('fonts', ['clean-fonts'], getTask('fonts'));
gulp.task('images', ['clean-images'], getTask('images'));
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], getTask('inject'));
gulp.task('templatecache', ['clean-code'], getTask('templatecache'));
gulp.task('wiredep', getTask('wiredep'));
gulp.task('build', ['optimize', 'images', 'fonts'], getTask('build'));
gulp.task('optimize', ['inject'], getTask('optimize'));

gulp.task('serve-dev', ['inject'], getTask('serve-dev'));
gulp.task('serve-build', ['build'], getTask('serve-build'));

gulp.task('sass-watcher', function() {
  gt.log('Watch sass files and run styles building on change');
  gulp.watch([config.sass], ['styles']);
});
