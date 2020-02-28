var gulp  = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browsersync', function() {

  var files = [
    './assets/css/*.css',
    './assets/js/bundle.js'
  ];

  browserSync.init(files, {
    // Replace with local site URL
    proxy: "http://localhost:8000",
  });

  gulp.watch(files).on('change', browserSync.reload);
});
