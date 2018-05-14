var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('./tsconfig.json', {typescript: require('typescript')});
var config = require('./gulp.config.js')();
var fs = require('fs');
var semver = require('semver');
var runSequence = require('run-sequence');
var shell = require('gulp-shell');
var argv = require('yargs').argv;

var version, increment, sequence, preid;

/**
 *
 * usage: 'npm run build' for local build
 * 
 * */

gulp.task('build-test', function (callback) {
    increment = argv.increment ? argv.increment : 'patch';
    sequence = argv.publish ? 'npm-publish' : 'build-local';
    preid = argv.preid ? argv.preid : '';

    if(argv.level || argv.subversion)
    {
        console.log('-------------------------------------------------------------------');
        console.log('----  Build not started. See gulpfile for further information. ----');
        console.log('-------------------------------------------------------------------');
    }
    else
    {
        runSequence(sequence, callback);
    }
});

gulp.task('build', function (callback) {
    runSequence(
        'clean-dist',
        'compile-ts',
        'copy-files',
        'copy-images',
        'copy-php-files',
        'copy-tslint-rules',
        'copy-to-htdocs',
        callback
    );
});

gulp.task('clean-dist', function () {
    return del(config.tsOutputPath);
});

//compile typescript files
gulp.task('compile-ts', function () {
    var sourceTsFiles = [
        config.excluded,
        config.allTs
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(config.tsOutputPath)),
        tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(config.tsOutputPath))
    ]);
});

//copy files to dist
gulp.task('copy-files', function () {
    return gulp.src(['package.json',
        'README.md',
        config.allCSS,
        config.allSCSS,
        config.allHTML])
        .pipe(gulp.dest(config.tsOutputPath));
});

//copy images to dist
gulp.task('copy-images', function () {
    return gulp.src(config.allImages)
        .pipe(gulp.dest(config.imagesOutputPath));
});

//copy php-files to dist
gulp.task('copy-php-files', function () {
    return gulp.src(config.allPhpFiles)
        .pipe(gulp.dest(config.phpOutputPath));
});

//copy lang to dist
gulp.task('copy-tslint-rules', function ()
{
    return gulp.src(config.tslint)
        .pipe(gulp.dest(config.tsOutputPath));
});

//copy files from dist to htdocs
gulp.task('copy-to-htdocs', function () {
    return gulp.src('dist/**/*.*')
        .pipe(gulp.dest('/xampp/htdocs'));
}); 
