"use strict"
const $ = require('gulp-load-plugins')();
const gulp = require('gulp4');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src)
            .pipe($.cached('assets'))
            .pipe($.newer(options.pathBuild))
            .pipe($.debug({ title: "assets" }))
            .pipe(gulp.dest(options.pathBuild))
    };
}