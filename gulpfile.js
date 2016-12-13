'use strict';

var gulp = require('gulp'),
//    minifycss = require('gulp-minify-css'),
//    jshint = require('gulp-jshint'),
//    stylish = require('jshint-stylish'),
//    uglify = require('gulp-uglify'),
//    usemin = require('gulp-usemin'),
//    imagemin = require('gulp-imagemin'),
//    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
//    del = require('del'),
//    rev = require('gulp-rev'),
//    htmlmin = require('gulp-htmlmin'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util');



//compile less to css
gulp.task('less', function () {
    return gulp.src('./app/styles/main.less')
        .pipe(plumber(function (err) {
            gutil.log(err.message);
            this.emit('end');
        }))
        .pipe(less())
        .pipe(gulp.dest('./app/styles/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//watch for changes
gulp.task('watch', ['browser-sync', 'less'], function () {
    gulp.watch('./app/styles/*.less', ['less']);
    gulp.watch('{./app/*.html,./app/scripts/*.js,./app/styles/*.css}', browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    })
});

//default tasks
//gulp.task('build', function (callback) {
//    runSequence('clean', 'less', 'usemin', 'htmlmin', ['imagemin', 'copyfonts', 'copy'], callback);
//});