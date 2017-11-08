var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  mmq = require('gulp-merge-media-queries'),
  jade = require('gulp-jade'),
  typograf = require('gulp-typograf'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  autoprefixer = require('gulp-autoprefixer'),
  px2rem = require('gulp-px2rem'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  plumber = require('gulp-plumber');

var path = {
  build: {
    root: 'build/',
    js: 'build/assets/js/',
    css: 'build/assets/css/',
    img: 'build/assets/img/',
    fonts: 'build/assets/fonts',
  },
  src: {
    jade: 'src/jade/*.jade',
    js: 'src/js/*.js',
    style: 'src/scss/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    jade: 'src/**/*.jade',
    js: 'src/js/**/*.js',
    style: 'src/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

var supported = [
  'last 3 versions',
  'safari >= 8',
  'ie >= 10',
  'ff >= 20',
  'ios 6',
  'android 4'
];

gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 8080,
    logPrefix: "localhost"
  });
});

gulp.task('html:build', function () {
  gulp.src(path.src.jade)
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    // .pipe(typograf({locale: ['ru', 'en-US']}))
    .pipe(gulp.dest(path.build.root))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano({
      autoprefixer: {browsers: supported, add: true}
    }))
    // .pipe(px2rem())
    .pipe(mmq({
      log: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(plumber())
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'image:build',
  'fonts:build'
]);


gulp.task('watch', function () {
  gulp.watch([path.watch.jade], ['html:build']);
  gulp.watch([path.watch.style], ['style:build']);
  gulp.watch([path.watch.js], ['js:build']);
  gulp.watch([path.watch.img], ['image:build']);
  gulp.watch([path.watch.fonts], ['fonts:build']);
});

gulp.task('default', ['build', 'webserver', 'watch']);