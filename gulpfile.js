const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const sync = require('browser-sync').create();
const del = require('del');

const styles = () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
}

exports.styles = styles;

const html = () => {
  return gulp.src('source/index.html')
    .pipe(gulp.dest('build'));
}

exports.html = html;

const scripts = () => {
  return gulp.src('source/js/main.js')
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts;

const copy = (done) => {
  return gulp.src(
    [
      'source/fonts/*.{woff2,woff}',
      'source/img/*.{jpg,png,svg}',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'))
  done();
}

exports.copy = copy;

const clean = () => {
  return del('build');
}

exports.clean = clean;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const reload = (done) => {
  sync.reload();
  done();
}

exports.reload = reload;

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch("source/js/main.js", gulp.series(scripts));
  gulp.watch('source/index.html', gulp.series(html, reload));
}

exports.watcher = watcher;

const build = gulp.series(clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy,
  )
);

exports.build = build;

exports.default = gulp.series(clean,
  gulp.parallel(
    styles,
    html,
    scripts,
    copy,
  ),
  gulp.series(
    server,
    watcher
  )
);