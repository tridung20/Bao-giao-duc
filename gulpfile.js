const { src, dest, parallel, series, watch } = require('gulp');

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    cssmin = require('gulp-clean-css'),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('imagemin-keep-folder'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminPngquant = require('imagemin-pngquant');
// removeEmptyLines = require('gulp-remove-empty-lines');
// strip = require('gulp-strip-comments');

const fileinclude = require('gulp-file-include');
const formatHtml = require('gulp-format-html')


var argv = require('yargs')
    .default({
        env: 'dev'
    }).argv,
    project = argv.path,
    file_style = argv.file,
    link_static = argv.static,
    env = argv.env;

if (!file_style) file_style = project;

var paths = {
    source_folder: "./source/" + project,
    dist_folder: "dist/" + project,

    scss_component: './source/' + project + '/component/**/*.scss',
    scss_source: './source/' + project + '/scss/**/*.scss',
    css_dist: './dist/' + project + '/styles/css',

    js_source: './source/' + project + '/js/**/*.js',
    js_dist: './dist/' + project + '/js',

    html_source: "./source/" + project + '/html/**/*.html',
    html_component: "./source/" + project + '/component/**/*.html',
    html_dist: "./dist/" + project + '/html',


    fonts_source: "./source/" + project + '/fonts/**/*',
    fonts_dist: "./dist/" + project + '/styles/fonts',

    img_source: "./source/" + project + '/img/**/*',
    img_dist: "./dist/" + project + '/styles/img/',
};

const ignoreFiles = [
    "!source/" + project + '/component/*.html',
    "!source/" + project + "/component/script/*.scss"
]



// > compile scss to css
function compile_scss_dist() {
    return src([paths.scss_source, ignoreFiles.join()], { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(sourcemaps.write('../maps'))
        .pipe(dest(paths.css_dist));

};

function compile_scss_component() {
    return src(paths.scss_component, { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(sourcemaps.write('../maps'))
        .pipe(dest(paths.css_dist));
};



// > copy 
async function copy_js() {
    return src(paths.js_source)
        .pipe(dest(paths.js_dist));
};

// > copy and prettyfy HTML
async function copy_html() {
    return src([paths.html_source, ignoreFiles.join()])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(formatHtml())
        // .pipe(strip())
        .pipe(dest(paths.html_dist));
};

async function copy_font_dist() {
    return src(paths.fonts_source)
        .pipe(dest(paths.fonts_dist));
};

function compress_png_dist() {
    return imagemin([paths.img_dist + '**/*'], {
        use: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
};

function copy_img_dist() {
    return src(paths.img_source)
        .pipe(dest(paths.img_dist));
};



// > refresh on change
function refresh_on_change(cb) {
    browserSync.reload();
    cb()
};

gulp.task('fileinclude', function () {
    gulp.src([paths.html_component])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
        }))
        .pipe(gulp.dest('dist'));
});


// Watch files
async function watch_dev() {
    browserSync.init({
        server: "./",
        startPath: "dist/desktop/html/index.html",
        browser: 'chrome',
        host: 'localhost',
        port: 3000,
        open: true,
    });
    watch(paths.scss_source, series(compile_scss_dist, refresh_on_change));
    watch(paths.scss_component, series(compile_scss_dist, refresh_on_change));
    watch(paths.js_source, series(copy_js, refresh_on_change));
    watch(paths.html_component, series(copy_html, refresh_on_change));
    watch(paths.html_source, series(copy_html, refresh_on_change));
    watch(paths.img_source, series(copy_img_dist, compress_png_dist));
}

// ===========
exports.build = parallel(
    series(copy_img_dist, compress_png_dist),
    compile_scss_dist,
    compile_scss_component,
    copy_js,
    copy_html,
    copy_font_dist,
), watch_dev();


/*
gulp build  --path desktop
gulp build  --path mobile
*/