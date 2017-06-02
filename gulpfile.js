let gulp = require("gulp");
let connect = require('gulp-connect');
let concat = require('gulp-concat');
let open = require('gulp-open');
let browserify = require("browserify");
let source = require('vinyl-source-stream');
let watchify = require("watchify");
let tsify = require("tsify");
let gutil = require("gulp-util");
let tsc = require('gulp-typescript');
let less = require('gulp-less');
let reactify = require('reactify');

let vendorJS = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js'
];

let vendorCSS = [
    'node_modules/bootstrap-grid/dist/grid.css'
];


let config = {
    port: process.env.PORT || 9010,
    devBaseUrl: 'http:localhost',
    paths: {
        html : './src/*.html',
        tsc: './src/tsc/*.ts',
        js: './src/tsc/*.js',
        less: './src/less/*.less',
        dist: './dist', 
        img: './src/images/*'
    }
}

gulp.task('vendorScripts', function() {
  return gulp.src(vendorJS)
    .pipe(concat('library.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('vendorStyles', function() {
  return gulp.src(vendorCSS)
    .pipe(concat('library.css'))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('connect', function () {
    connect.server({
        root:['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('./dist/index.html')
    .pipe(open({
        uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('test',function(){
	require('./test.js');
})

gulp.task('img', function() {
    gulp.src(config.paths.img)
    .pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('tsc', function () {
    return gulp.src('src/tsc/*.ts')
        .pipe(tsc({
            noImplicitAny: true,
            out: 'main.js'
        }))
        .pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('js', function() {
    browserify(['src/tsc/classes.js', 'src/tsc/components/homepage.js'])
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('less', function () {
  return gulp.src(config.paths.less)
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(config.paths.dist + '/styles'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.tsc, ['tsc']);
    gulp.watch(config.paths.js,['js']);
    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.img, ['img']);
});

gulp.task('default', ['html', 'vendorScripts', 'vendorStyles', 'test', 'js', 'tsc', 'less', 'img', 'open', 'watch']);