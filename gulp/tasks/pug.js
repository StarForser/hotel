"use strict"

const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-group-css-media-queries': 'gcmq'
      }
});
const gulp = require('gulp4');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
    let manifest = gulp.src(options.pathManifest + options.fileNameManifest, { allowEmpty: true });
    return function () {
        return gulp.src(options.src)
            .pipe($.plumber({
                errorHandler: $.notify.onError({
                    title: "Pug"
                })
            }))
            .pipe($.pug({
                pretty: true
            }))
            .pipe($.if(!isDevelopment, $.revReplace({
                manifest: manifest
            })))
            .pipe(gulp.dest(options.pathBuild))
    }

}