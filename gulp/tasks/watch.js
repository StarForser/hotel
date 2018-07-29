"use strict"

const $ = require('gulp-load-plugins')();
const gulp = require('gulp4');

module.exports = function (options) {
    return function () {
            gulp.watch(options.pathStyles, gulp.series('styles')).on("unlink", function(filepath) {
                remember.forget("styles", path.resolve(filepath));
            })
            gulp.watch('./src/pug/**/*.pug', gulp.series('pug'))
            gulp.watch('./src/assets/**/*.*', gulp.series('assets')).on('unlink', function(filepath){
                delete $.cached.caches.assets[$.fullpath.resolve(filepath)]
            })
            gulp.watch('./src/js/**/*.*', gulp.series('js'))
    }
}