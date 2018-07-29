"use strict"

const smartgrid = require('smart-grid');
const fs = require("fs");
const $ = require('gulp-load-plugins')();
const settings = {
    "filename": "smart-grid",
    "outputStyle": "scss",
    "columns": 12,
    "offset": "30px",
    mobileFirst: false,
    "container": {
        "maxWidth": "1280px",
        "fields": "30px"
    },
    "breakPoints": {
        "lg": {
            "width": "1200px",
            "fields": "30px"
        },
        "md": {
            "width": "992px",
            "fields": "15px"
        },
        "sm": {
            "width": "720px",
            "fields": "15px"
        },
        "xs": {
            "width": "576px",
            "fields": "15px"
        }
    },
    "mixinNames": {
        "container": "wrapper",
        "row": "row-flex",
        "rowFloat": "row-float",
        "column": "col",
        "columnFloat": "col-float",
        "columnPadding": "col-padding",
        "offset": "offset"
    },
    "properties": [
        "justify-content",
        "align-items",
        "align-content",
        "align-self",
        "order",
        "flex",
        "flex-grow",
        "flex-shrink",
        "flex-basis",
        "flex-direction",
        "flex-wrap",
        "flex-flow",
        "float"
    ],
    "tab": "    "
}

module.exports = function (options) {
    return function (callback) {
        fs.readdir(options.pathGrid, (err)=> console.log(err))
        fs.mkdir(options.pathGrid,(err)=> console.log(err))
        smartgrid(options.pathGrid, settings)
        callback();
    }
}