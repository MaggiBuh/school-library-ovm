var gulp = require('gulp');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var config = require('./gulp.config.js')();

var increment, sequence, preid;

/**
 *
 * usage: 'npm run build' for local build
 *
 * */

gulp.task('build', function (callback) {
    increment = argv.increment ? argv.increment : 'patch';
    sequence = 'build-local';
    preid = argv.preid ? argv.preid : '';

    if (argv.level || argv.subversion) {
        console.log('-------------------------------------------------------------------');
        console.log('----  Build not started. See gulpfile for further information. ----');
        console.log('-------------------------------------------------------------------');
    }
    else {
        runSequence(sequence, callback);
    }
});

gulp.task('build-local', function (callback) {
    runSequence(
        'copy-to-htdocs',
        callback
    );
});

//copy files from dist to htdocs
gulp.task('copy-to-htdocs', function () {
    return gulp.src('dist/**/*.*')
        .pipe(gulp.dest(config.htdocsMacOsPath));
}); 
