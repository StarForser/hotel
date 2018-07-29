"use strict"

const $ = require('gulp-load-plugins')({
    rename: {
        'gulp-group-css-media-queries': 'gcmq'
      }
});
const gulp = require('gulp4');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
   return function () {
        return gulp.src(options.src, {since: gulp.lastRun("styles")})
            .pipe($.plumber({
                errorHandler: $.notify.onError({
                    title: "Style"
                })
            }))
            .pipe($.remember("styles"))
            .pipe($.debug({title: 'styles'}))
            .pipe($.inject(gulp.src([options.path], {read: false}), {
                starttag: '/* inject:imports */',
                endtag: '/* endinject */',
                transform: function (filepath) {
                    return '@import ".' + filepath + '";';
                }
            }))
            .pipe($.if(isDevelopment, $.sourcemaps.init()))
                .pipe($.sass())
                .pipe($.autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe($.if(!isDevelopment, $.gcmq()))

            .pipe($.if(isDevelopment, $.sourcemaps.write()))
            .pipe($.if(!isDevelopment, $.csso()))
            .pipe($.rename('build.css'))
            .pipe(gulp.dest(options.pathBuild))
    }
    
}