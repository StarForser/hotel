"use strict"

const $ = require('gulp-load-plugins')();
const gulp = require('gulp4');

module.exports = function (options) {
    return function () {
        return gulp.src([options.pathBuildCss, options.pathBuildJs], {base: options.pathBuild})
        .pipe($.debug({title: 'manifest'}))
        .pipe(gulp.dest(options.pathBuild))
        .pipe($.rev())
        .pipe(gulp.dest(options.pathBuild))
        .pipe($.rev.manifest({
            merge: true,
            base: options.pathBuild
        }))
        .pipe($.rename(options.fileName))
        .pipe(gulp.dest(options.pathManifest))
    }


}