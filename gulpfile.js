const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const purge = require('gulp-css-purge');
const del = require('del');

const paths = {
  styles: {
    src: [
      'src/client/css/style.css',
      'src/client/css/animation.css',
      'src/client/css/media.css'
    ],
    dest: 'dist/client/css/'
  },
  images: {
    src: 'src/client/images/**/*',
    dest: 'dist/client/images/'
  }
};

const clean = () => del(['dist/client/css', 'dist/client/images']);

const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(concatCss("style.css"))
    .pipe(purge({ trim : true, shorten : true, verbose : true }))
    .pipe(gulp.dest(paths.styles.dest));
};

const images = () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
};

const build = gulp.series(clean, gulp.parallel(styles, images));

exports.default = build;