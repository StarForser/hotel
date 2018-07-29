'use strict';

const gulp = require("gulp4");
const pathTask = "./gulp/tasks/";
const fileNameManifest = "manifest.json";
const pathBuild = "./build/";


function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

lazyRequireTask('clean', pathTask + "clean", {
    pathBuild: './build'
})
lazyRequireTask('styles', pathTask + "styles", {
    src: 'src/styles/main.scss',
    path: 'src/styles/block/**/*.scss',
    pathBuild: pathBuild + 'styles',
})
lazyRequireTask('pug', pathTask + "pug", {
    src: 'src/pug/pages/**/*.*',
    path: 'src/pug/block/**/*.scss',
    pathBuild: pathBuild,
    pathManifest: pathBuild + "manifest",
    fileNameManifest: fileNameManifest
})
lazyRequireTask('js', pathTask + "js", {
    src: 'src/js/**/*.js',
    pathBuild: pathBuild + "js",
})
lazyRequireTask('svgS', pathTask + "svgS", {
    src: 'src/svg/**/*.svg',
    pathBuild: pathBuild,
})
lazyRequireTask('manifest', pathTask + "manifest", {
    pathManifest: pathBuild + "manifest",
    pathBuild: pathBuild,
    pathBuildCss: './build/styles/*.css',
    pathBuildJs: './build/js/*.js',
    fileName: fileNameManifest
})
lazyRequireTask('server', pathTask + "server", {
    pathBuild: pathBuild
})
lazyRequireTask('assets', pathTask + "assets", {
    pathBuild: pathBuild,
    src: "./src/assets/**"
})
lazyRequireTask('watch', pathTask + "watch", {
    pathBuild: pathBuild,
    pathStyles: "./src/styles/**/*.*"
})
lazyRequireTask('grid', pathTask + "grid", {
    pathGrid: "./src/styles/grid"
})




gulp.task('build', gulp.series('clean', gulp.parallel('styles','js', 'svgS','assets')));

gulp.task('dev', gulp.series(
    ['build',
    'pug'],
    gulp.parallel(
        'watch', 
        'server')
    )
);


gulp.task('deploy', gulp.series(
    'build',
    'manifest',
    'pug',
    )
);