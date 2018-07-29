"use strict"

const $ = require('gulp-load-plugins')();
const gulp = require('gulp4');

module.exports = function (options) {
    return  function () {
        return gulp.src(options.src)
                .pipe($.svgmin({
                    js2svg: {
                        pretty: true
                    }
                }))
                .pipe($.cheerio({
                    run: function ($) {
                        $('[fill]').removeAttr('fill');
                        $('[stroke]').removeAttr('stroke');
                        $('[style]').removeAttr('style');
                    },
                    parserOptions: { xmlMode: true }
                }))
                .pipe($.replace('&gt;', '>'))
                .pipe($.svgSprite({
                    mode: {
                        symbol: {
                            sprite: "../sprite.svg",
                            render: {
                                scss: {
                                    dest: '../../src/styles/self/_sprite.scss',
                                    template: './src/styles/self/_sprite_template.scss'
                                }
                            }
                        }
                    }
                }))
                .pipe(gulp.dest(options.pathBuild));
    }
}