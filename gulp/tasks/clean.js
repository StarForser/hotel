"use strict"

const clean = require('gulp-clean');
const gulp = require('gulp4');

module.exports = function (options) {
    return function () {
        return gulp.src(options.pathBuild, { read: false })
            .pipe(clean())
    }
}
 