"use strict"

const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-uglify-es': 'uglifyES'
      }
});
const gulp = require('gulp4');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
            .pipe($.plumber({
                errorHandler: $.notify.onError({
                    title: "JS"
                })
            }))
            .pipe($.if(isDevelopment, $.sourcemaps.init()))
                .pipe($.concat('all.js'))
                .pipe($.if(!isDevelopment, $.uglifyES.default()))
                .pipe($.babel({
                    presets: ['env']
                }))
            .pipe($.if(isDevelopment, $.sourcemaps.write()))
            .pipe($.rename('build.js'))
            .pipe(gulp.dest(options.pathBuild))
    }
}