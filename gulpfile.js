var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var bs= require('browser-sync').create();
var uncss = require('gulp-uncss');

/* Prepare Browser-sync for localhost */

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});


/* Sass task */
gulp.task('sass', function() {
  return gulp.src('assets/scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(minifycss())
    .pipe(uncss({
          html: ['index.html', 'about/index.html','contact/index.html','beers/index.html'], ignore: ['.expand', '.expand span', '.expand span.top', '.expand span.mid', '.expand span.bottom','.expand+#wrapper', '.nav-toggle span', '.nav-toggle span']
      }))
    .pipe(gulp.dest('assets/css'))

         .pipe(bs.reload({stream: true}));
})



/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['assets/scss/*.scss', 'scss/**/*.scss'], ['sass'])
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch("*.html").on('change', bs.reload);
});

// end gulpfile
