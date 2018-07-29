"use strict"

const browserSync = require('browser-sync');

module.exports = function (options) {
    return function () {
        browserSync.init({
            open: false,
            server: options.pathBuild
        });
        browserSync.watch(options.pathBuild).on('change', browserSync.reload)
    }
}